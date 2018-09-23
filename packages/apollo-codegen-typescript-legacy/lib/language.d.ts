import { LegacyInlineFragment } from "apollo-codegen-core/lib/compiler/legacyIR";
import CodeGenerator from "apollo-codegen-core/lib/utilities/CodeGenerator";
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
export declare function interfaceDeclaration(
  generator: CodeGenerator,
  {
    interfaceName,
    noBrackets
  }: {
    interfaceName: string;
    noBrackets?: boolean;
  },
  closure: () => void
): void;
export declare function propertyDeclaration(
  generator: CodeGenerator,
  {
    fieldName,
    type,
    propertyName,
    typeName,
    description,
    isInput,
    isArray,
    isNullable,
    isArrayElementNullable
  }: Property,
  closure?: () => void
): void;
export declare function propertySetsDeclaration(
  generator: CodeGenerator,
  property: Property,
  propertySets: Property[][],
  standalone?: boolean
): void;