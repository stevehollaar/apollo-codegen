import { GraphQLEnumType, GraphQLInputObjectType } from "graphql";
import {
  CompilerContext,
  Operation,
  Fragment
} from "apollo-codegen-core/lib/compiler";
import { BasicGeneratedFile } from "apollo-codegen-core/lib/utilities/CodeGenerator";
import FlowGenerator from "./language";
import Printer from "./printer";
declare class FlowGeneratedFile implements BasicGeneratedFile {
  fileContents: string;
  constructor(fileContents: string);
  readonly output: string;
}
export declare function generateSource(
  context: CompilerContext
): {
  generatedFiles: {
    sourcePath: string;
    fileName: string;
    content: FlowGeneratedFile;
  }[];
  common: string;
};
export declare class FlowAPIGenerator extends FlowGenerator {
  context: CompilerContext;
  printer: Printer;
  scopeStack: string[];
  constructor(context: CompilerContext);
  fileHeader(): void;
  typeAliasForEnumType(enumType: GraphQLEnumType): void;
  typeAliasForInputObjectType(inputObjectType: GraphQLInputObjectType): void;
  typeAliasesForOperation(operation: Operation): void;
  typeAliasesForFragment(fragment: Fragment): void;
  private getVariantsForSelectionSet;
  private getTypeCasesForSelectionSet;
  private getPropertiesForVariant;
  private handleFieldSelectionSetValue;
  private handleFieldValue;
  readonly output: string;
  scopeStackPush(name: string): void;
  scopeStackPop(): string | undefined;
}
export {};