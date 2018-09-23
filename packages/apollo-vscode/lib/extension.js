"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_1 = require("vscode");
const vscode = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
function sideViewColumn() {
  if (!vscode.window.activeTextEditor) {
    return vscode.ViewColumn.One;
  }
  switch (vscode.window.activeTextEditor.viewColumn) {
    case vscode.ViewColumn.One:
      return vscode.ViewColumn.Two;
    case vscode.ViewColumn.Two:
      return vscode.ViewColumn.Three;
    default:
      return vscode.window.activeTextEditor.viewColumn;
  }
}
function activate(context) {
  const serverModule = context.asAbsolutePath(path.join("server", "server.js"));
  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
  const serverOptions = {
    run: {
      module: serverModule,
      transport: vscode_languageclient_1.TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: vscode_languageclient_1.TransportKind.ipc,
      options: debugOptions
    }
  };
  const clientOptions = {
    documentSelector: [
      "graphql",
      "javascript",
      "typescript",
      "javascriptreact",
      "typescriptreact"
    ],
    synchronize: {
      fileEvents: [
        vscode_1.workspace.createFileSystemWatcher("**/apollo.config.js"),
        vscode_1.workspace.createFileSystemWatcher("**/package.json"),
        vscode_1.workspace.createFileSystemWatcher(
          "**/*.{graphql,js,ts,jsx,tsx}"
        )
      ]
    }
  };
  let currentPanel = undefined;
  let currentCancellationID = undefined;
  let currentMessageHandler = undefined;
  const client = new vscode_languageclient_1.LanguageClient(
    "apollographql",
    "Apollo GraphQL",
    serverOptions,
    clientOptions
  );
  client.registerProposedFeatures();
  context.subscriptions.push(client.start());
  const getApolloPanel = () => {
    if (currentPanel) {
      if (!currentPanel.visible) {
        currentPanel.reveal(sideViewColumn());
      }
      return currentPanel;
    } else {
      currentPanel = vscode.window.createWebviewPanel(
        "apolloPanel",
        "",
        sideViewColumn(),
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, "webview-content"))
          ]
        }
      );
      currentPanel.onDidDispose(
        () => {
          currentPanel = undefined;
          if (currentCancellationID) {
            client.sendNotification("apollographql/cancelQuery", {
              cancellationID: currentCancellationID
            });
            currentCancellationID = undefined;
          }
        },
        null,
        context.subscriptions
      );
      currentPanel.webview.onDidReceiveMessage(
        message => {
          if (currentMessageHandler) {
            currentMessageHandler(message);
          }
        },
        undefined,
        context.subscriptions
      );
      currentPanel.onDidDispose(() => {
        currentMessageHandler = undefined;
      });
      return currentPanel;
    }
  };
  client.onReady().then(() => {
    let currentLoadingResolve = new Map();
    client.onNotification("apollographql/loadingComplete", token => {
      const inMap = currentLoadingResolve.get(token);
      if (inMap) {
        inMap();
        currentLoadingResolve.delete(token);
      }
    });
    client.onNotification("apollographql/loading", ({ message, token }) => {
      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: message,
          cancellable: false
        },
        () => {
          return new Promise(resolve => {
            currentLoadingResolve.set(token, resolve);
          });
        }
      );
    });
    client.onNotification(
      "apollographql/requestVariables",
      ({ query, endpoint, headers, requestedVariables, schema }) => {
        getApolloPanel().title = "GraphQL Query Variables";
        if (currentCancellationID) {
          client.sendNotification("apollographql/cancelQuery", {
            cancellationID: currentCancellationID
          });
          currentCancellationID = undefined;
        }
        currentMessageHandler = message => {
          switch (message.type) {
            case "started":
              currentPanel.webview.postMessage({
                type: "setMode",
                content: {
                  type: "VariablesInput",
                  requestedVariables: requestedVariables,
                  schema: schema
                }
              });
              break;
            case "variables":
              client.sendNotification("apollographql/runQueryWithVariables", {
                query,
                endpoint,
                headers,
                variables: message.content
              });
              currentMessageHandler = undefined;
              break;
          }
        };
        const mediaPath =
          vscode.Uri.file(path.join(context.extensionPath, "webview-content"))
            .with({
              scheme: "vscode-resource"
            })
            .toString() + "/";
        currentMessageHandler({ type: "started" });
        currentPanel.webview.html = `
          <html>
            <body>
              <div id="root"></div>
              <base href="${mediaPath}">
              <script src="webview.bundle.js"></script>
            </body>
          </html>
        `;
      }
    );
    client.onNotification(
      "apollographql/queryResult",
      ({ result, cancellationID }) => {
        getApolloPanel().title = "GraphQL Query Result";
        if (currentCancellationID !== cancellationID) {
          if (currentCancellationID) {
            client.sendNotification("apollographql/cancelQuery", {
              cancellationID: currentCancellationID
            });
          }
          currentCancellationID = cancellationID;
        }
        currentMessageHandler = message => {
          switch (message.type) {
            case "started":
              currentPanel.webview.postMessage({
                type: "setMode",
                content: {
                  type: "ResultViewer",
                  result
                }
              });
              currentMessageHandler = undefined;
              break;
          }
        };
        const mediaPath =
          vscode.Uri.file(path.join(context.extensionPath, "webview-content"))
            .with({
              scheme: "vscode-resource"
            })
            .toString() + "/";
        currentMessageHandler({ type: "started" });
        currentPanel.webview.html = `
          <html>
            <body>
              <div id="root"></div>
              <base href="${mediaPath}">
              <script src="webview.bundle.js"></script>
            </body>
          </html>
        `;
      }
    );
    const engineDecoration = vscode.window.createTextEditorDecorationType({});
    let latestDecs = undefined;
    const updateDecorations = () => {
      if (vscode.window.activeTextEditor && latestDecs) {
        const editor = vscode.window.activeTextEditor;
        const decorations = latestDecs
          .filter(
            d =>
              d.document ===
              vscode.window.activeTextEditor.document.uri.toString()
          )
          .map(dec => {
            return {
              range: editor.document.lineAt(dec.range.start.line).range,
              renderOptions: {
                after: {
                  contentText: `# ${dec.message}`,
                  textDecoration: "none; padding-left: 15px; opacity: 0.5"
                }
              }
            };
          });
        vscode.window.activeTextEditor.setDecorations(
          engineDecoration,
          decorations
        );
      }
    };
    client.onNotification("apollographql/engineDecorations", (...decs) => {
      latestDecs = decs;
      updateDecorations();
    });
    vscode.window.onDidChangeActiveTextEditor(() => {
      updateDecorations();
    });
    vscode.workspace.registerTextDocumentContentProvider("graphql-schema", {
      provideTextDocumentContent(uri) {
        return uri.query;
      }
    });
  });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map
