import "./polyfills";
import {
  DocumentNode,
  GraphQLSchema,
  OperationDefinitionNode,
  FragmentDefinitionNode
} from "graphql";
export declare function loadSchema(schemaPath: string): GraphQLSchema;
export declare function extractDocumentFromJavascript(
  content: string,
  options?: {
    tagName?: string;
    parser?: any;
    inputPath?: string;
  }
): string | null;
export declare function loadQueryDocuments(
  inputPaths: string[],
  tagName?: string
): DocumentNode[];
export declare function loadAndMergeQueryDocuments(
  inputPaths: string[],
  tagName?: string
): DocumentNode;
export declare function extractOperationsAndFragments(
  documents: Array<DocumentNode>,
  errorLogger?: (message: string) => void
): {
  fragments: Record<string, FragmentDefinitionNode>;
  operations: OperationDefinitionNode[];
};
export declare function combineOperationsAndFragments(
  operations: Array<OperationDefinitionNode>,
  fragments: Record<string, FragmentDefinitionNode>,
  errorLogger?: (message: string) => void
): DocumentNode[];
