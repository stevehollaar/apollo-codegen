import { GraphQLEnumType, GraphQLInputObjectType, GraphQLType } from "graphql";
import { CompilerOptions } from "apollo-codegen-core/lib/compiler";
import * as t from "@babel/types";
export declare type ObjectProperty = {
  name: string;
  description?: string | null | undefined;
  type: t.TSType;
};
export interface TypescriptCompilerOptions extends CompilerOptions {}
export default class TypescriptGenerator {
  options: TypescriptCompilerOptions;
  typeFromGraphQLType: Function;
  constructor(compilerOptions: TypescriptCompilerOptions);
  enumerationDeclaration(type: GraphQLEnumType): t.ExportNamedDeclaration;
  inputObjectDeclaration(
    inputObjectType: GraphQLInputObjectType
  ): t.ExportNamedDeclaration;
  typesForProperties(
    fields: ObjectProperty[],
    {
      keyInheritsNullability
    }?: {
      keyInheritsNullability?: boolean;
    }
  ): t.TSPropertySignature[];
  interface(
    name: string,
    fields: ObjectProperty[],
    {
      keyInheritsNullability
    }?: {
      keyInheritsNullability?: boolean;
    }
  ): t.TSInterfaceDeclaration;
  typeAliasGenericUnion(
    name: string,
    members: t.TSType[]
  ): t.TSTypeAliasDeclaration;
  exportDeclaration(declaration: t.Declaration): t.ExportNamedDeclaration;
  nameFromScopeStack(scope: string[]): string;
  makeNullableType(type: t.TSType): t.TSUnionType;
  isNullableType(type: t.TSType): boolean;
  import(types: GraphQLType[], source: string): t.ImportDeclaration;
}
