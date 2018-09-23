import CodeGenerator from "apollo-codegen-core/lib/utilities/CodeGenerator";
import {
  LegacyCompilerContext,
  LegacyInlineFragment
} from "apollo-codegen-core/lib/compiler/legacyIR";
import { GraphQLType } from "graphql";
export interface Property {
  fieldName?: string;
  fieldType?: GraphQLType;
  propertyName?: string;
  type?: GraphQLType;
  description?: string;
  typeName?: string;
  isComposite?: boolean;
  isNullable?: boolean;
  fields?: any[];
  inlineFragments?: LegacyInlineFragment[];
  fragmentSpreads?: any;
  isInput?: boolean;
  isArray?: boolean;
  isArrayElementNullable?: boolean | null;
}
export declare function typeDeclaration(
  generator: CodeGenerator<LegacyCompilerContext>,
  {
    interfaceName,
    noBrackets
  }: {
    interfaceName: string;
    noBrackets?: boolean;
  },
  closure: Function
): void;
export declare function propertyDeclaration(
  generator: CodeGenerator<LegacyCompilerContext>,
  {
    fieldName,
    type,
    propertyName,
    typeName,
    description,
    isArray,
    isNullable,
    isArrayElementNullable,
    isInput
  }: Property,
  closure?: Function,
  open?: string,
  close?: string
): void;
export declare function propertySetsDeclaration(
  generator: CodeGenerator<LegacyCompilerContext>,
  property: Property,
  propertySets: Property[][],
  standalone?: boolean
): void;
