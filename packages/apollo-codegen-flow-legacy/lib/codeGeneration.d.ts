import CodeGenerator from "apollo-codegen-core/lib/utilities/CodeGenerator";
import { Property } from "./language";
import {
  LegacyCompilerContext,
  LegacyOperation,
  LegacyFragment,
  LegacyField
} from "apollo-codegen-core/lib/compiler/legacyIR";
import { GraphQLType } from "graphql";
export declare function generateSource(context: LegacyCompilerContext): string;
export declare function typeDeclarationForGraphQLType(
  generator: CodeGenerator<LegacyCompilerContext>,
  type: GraphQLType
): void;
export declare function interfaceVariablesDeclarationForOperation(
  generator: CodeGenerator<LegacyCompilerContext>,
  { operationName, operationType, variables }: LegacyOperation
): void;
export declare function typeDeclarationForOperation(
  generator: CodeGenerator<LegacyCompilerContext>,
  { operationName, operationType, fields }: LegacyOperation
): void;
export declare function typeDeclarationForFragment(
  generator: CodeGenerator<LegacyCompilerContext>,
  fragment: LegacyFragment
): void;
export declare function propertiesFromFields(
  context: LegacyCompilerContext,
  fields: LegacyField[]
): Property[];
export declare function propertyFromField(
  context: LegacyCompilerContext,
  field: LegacyField
): Property;
export declare function propertyDeclarations(
  generator: CodeGenerator<LegacyCompilerContext>,
  properties: Property[],
  isInput?: boolean
): void;
