"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const printing_1 = require("apollo-codegen-core/lib/utilities/printing");
const graphql_1 = require("apollo-codegen-core/lib/utilities/graphql");
const helpers_1 = require("./helpers");
const t = require("@babel/types");
class TypescriptGenerator {
  constructor(compilerOptions) {
    this.options = compilerOptions;
    this.typeFromGraphQLType = helpers_1.createTypeFromGraphQLTypeFunction(
      compilerOptions
    );
  }
  enumerationDeclaration(type) {
    const { name, description } = type;
    const enumMembers = graphql_1
      .sortEnumValues(type.getValues())
      .map(({ value }) => {
        return t.TSEnumMember(t.identifier(value), t.stringLiteral(value));
      });
    const typeAlias = t.exportNamedDeclaration(
      t.TSEnumDeclaration(t.identifier(name), enumMembers),
      []
    );
    if (description) {
      typeAlias.leadingComments = [
        {
          type: "CommentBlock",
          value: printing_1.commentBlockContent(description)
        }
      ];
    }
    return typeAlias;
  }
  inputObjectDeclaration(inputObjectType) {
    const { name, description } = inputObjectType;
    const fieldMap = inputObjectType.getFields();
    const fields = Object.keys(inputObjectType.getFields()).map(fieldName => {
      const field = fieldMap[fieldName];
      return {
        name: fieldName,
        type: this.typeFromGraphQLType(field.type)
      };
    });
    const inputType = t.exportNamedDeclaration(
      this.interface(name, fields, {
        keyInheritsNullability: true
      }),
      []
    );
    if (description) {
      inputType.leadingComments = [
        {
          type: "CommentBlock",
          value: printing_1.commentBlockContent(description)
        }
      ];
    }
    return inputType;
  }
  typesForProperties(fields, { keyInheritsNullability = false } = {}) {
    return fields.map(({ name, description, type }) => {
      const propertySignatureType = t.TSPropertySignature(
        t.identifier(name),
        t.TSTypeAnnotation(type)
      );
      propertySignatureType.optional =
        keyInheritsNullability && this.isNullableType(type);
      if (description) {
        propertySignatureType.leadingComments = [
          {
            type: "CommentBlock",
            value: printing_1.commentBlockContent(description)
          }
        ];
      }
      return propertySignatureType;
    });
  }
  interface(name, fields, { keyInheritsNullability = false } = {}) {
    return t.TSInterfaceDeclaration(
      t.identifier(name),
      undefined,
      undefined,
      t.TSInterfaceBody(
        this.typesForProperties(fields, {
          keyInheritsNullability
        })
      )
    );
  }
  typeAliasGenericUnion(name, members) {
    return t.TSTypeAliasDeclaration(
      t.identifier(name),
      undefined,
      t.TSUnionType(members)
    );
  }
  exportDeclaration(declaration) {
    return t.exportNamedDeclaration(declaration, []);
  }
  nameFromScopeStack(scope) {
    return scope.join("_");
  }
  makeNullableType(type) {
    return t.TSUnionType([type, t.TSNullKeyword()]);
  }
  isNullableType(type) {
    return (
      t.isTSUnionType(type) && type.types.some(type => t.isTSNullKeyword(type))
    );
  }
  import(types, source) {
    return t.importDeclaration(
      types.map(type =>
        t.importSpecifier(
          t.identifier(type.toString()),
          t.identifier(type.toString())
        )
      ),
      t.stringLiteral(source)
    );
  }
}
exports.default = TypescriptGenerator;
//# sourceMappingURL=language.js.map