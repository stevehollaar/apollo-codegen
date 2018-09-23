import {
  LegacyCompilerContext,
  LegacyInlineFragment,
  LegacyFragment,
  LegacyOperation
} from "apollo-codegen-core/lib/compiler/legacyIR";
import { GraphQLType } from "graphql";
import CodeGenerator from "apollo-codegen-core/lib/utilities/CodeGenerator";
import { Property } from "./language";
export declare function generateSource(context: LegacyCompilerContext): string;
export declare function typeDeclarationForGraphQLType(
  generator: CodeGenerator,
  type: GraphQLType
): void;
export declare function interfaceVariablesDeclarationForOperation(
  generator: CodeGenerator,
  { operationName, operationType, variables }: LegacyOperation
): void;
export declare function interfaceDeclarationForOperation(
  generator: CodeGenerator,
  { operationName, operationType, fields }: LegacyOperation
): void;
export declare function interfaceDeclarationForFragment(
  generator: CodeGenerator,
  fragment: LegacyFragment
): void;
export declare function propertiesFromFields(
  context: LegacyCompilerContext,
  fields: {
    name?: string;
    type: GraphQLType;
    responseName?: string;
    description?: string | undefined | null;
    fragmentSpreads?: any;
    inlineFragments?: LegacyInlineFragment[];
    fieldName?: string;
  }[]
): Property[];
export declare function propertyFromField(
  context: LegacyCompilerContext,
  field: {
    name?: string;
    type: GraphQLType;
    fields?: any[];
    responseName?: string;
    description?: string;
    fragmentSpreads?: any;
    inlineFragments?: LegacyInlineFragment[];
    fieldName?: string;
  }
): Property;
export declare function propertyDeclarations(
  generator: CodeGenerator,
  properties: Property[],
  isInput?: boolean
): void;
export declare function printDocComment(
  generator: CodeGenerator,
  description?: string,
  depth?: number
): void;