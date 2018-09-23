import { GraphQLType, GraphQLScalarType, GraphQLInputField } from "graphql";
import { Property, Struct } from "./language";
import {
  CompilerOptions,
  SelectionSet,
  Field,
  FragmentSpread,
  Argument
} from "apollo-codegen-core/lib/compiler";
import { Variant } from "apollo-codegen-core/lib/compiler/visitors/typeCase";
export declare class Helpers {
  options: CompilerOptions;
  constructor(options: CompilerOptions);
  typeNameFromGraphQLType(
    type: GraphQLType,
    unmodifiedTypeName?: string,
    isOptional?: boolean
  ): string;
  typeNameForScalarType(type: GraphQLScalarType): string;
  fieldTypeEnum(type: GraphQLType, structName: string): string;
  enumCaseName(name: string): string;
  enumDotCaseName(name: string): string;
  operationClassName(name: string): string;
  structNameForPropertyName(propertyName: string): string;
  structNameForFragmentName(fragmentName: string): string;
  structNameForVariant(variant: SelectionSet): string;
  propertyFromField(
    field: Field,
    namespace?: string
  ): Field & Property & Struct;
  propertyFromVariant(variant: Variant): Variant & Property & Struct;
  propertyFromFragmentSpread(
    fragmentSpread: FragmentSpread,
    isConditional: boolean
  ): FragmentSpread & Property & Struct;
  propertyFromInputField(
    field: GraphQLInputField
  ): GraphQLInputField & {
    propertyName: string;
    typeName: string;
    isOptional: boolean;
  };
  propertiesForSelectionSet(
    selectionSet: SelectionSet,
    namespace?: string
  ): (Field & Property & Struct)[] | undefined;
  dictionaryLiteralForFieldArguments(args: Argument[]): string;
  mapExpressionForType(
    type: GraphQLType,
    isConditional: boolean | undefined,
    makeExpression: (expression: string) => string,
    expression: string,
    inputTypeName: string,
    outputTypeName: string
  ): string;
}
