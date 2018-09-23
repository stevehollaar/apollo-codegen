import { GraphQLType, GraphQLEnumType, GraphQLInputObjectType } from "graphql";
import {
  CompilerContext,
  Operation,
  Fragment,
  SelectionSet,
  Field
} from "apollo-codegen-core/lib/compiler";
import { SwiftGenerator, Property, Struct } from "./language";
import { Helpers } from "./helpers";
import {
  TypeCase,
  Variant
} from "apollo-codegen-core/lib/compiler/visitors/typeCase";
import "apollo-codegen-core/lib/utilities/array";
export interface Options {
  namespace?: string;
  passthroughCustomScalars?: boolean;
  customScalarsPrefix?: string;
}
export declare function generateSource(
  context: CompilerContext,
  outputIndividualFiles: boolean,
  only?: string
): SwiftAPIGenerator;
export declare class SwiftAPIGenerator extends SwiftGenerator<CompilerContext> {
  helpers: Helpers;
  constructor(context: CompilerContext);
  fileHeader(): void;
  classDeclarationForOperation(operation: Operation): void;
  structDeclarationForFragment({
    fragmentName,
    selectionSet,
    source
  }: Fragment): void;
  structDeclarationForSelectionSet(
    {
      structName,
      adoptedProtocols,
      selectionSet
    }: {
      structName: string;
      adoptedProtocols?: string[];
      selectionSet: SelectionSet;
    },
    before?: Function
  ): void;
  structDeclarationForVariant(
    {
      structName,
      adoptedProtocols,
      variant,
      typeCase
    }: {
      structName: string;
      adoptedProtocols?: string[];
      variant: Variant;
      typeCase?: TypeCase;
    },
    before?: Function,
    after?: Function
  ): void;
  initializersForTypeCase(typeCase: TypeCase): void;
  initializersForVariant(
    variant: Variant,
    namespace?: string,
    useInitializerIfPossible?: boolean
  ): void;
  propertyAssignmentForField(field: {
    responseKey: string;
    propertyName: string;
    type: GraphQLType;
    isConditional?: boolean;
    structName?: string;
  }): string;
  propertyDeclarationForField(field: Field & Property): void;
  propertyDeclarationForVariant(variant: Property & Struct): void;
  initializerDeclarationForProperties(properties: Property[]): void;
  parametersForProperties(properties: Property[]): void;
  typeCaseInitialization(typeCase: TypeCase): void;
  selectionSetInitialization(selectionSet: SelectionSet): void;
  typeDeclarationForGraphQLType(type: GraphQLType): void;
  enumerationDeclaration(type: GraphQLEnumType): void;
  structDeclarationForInputObjectType(type: GraphQLInputObjectType): void;
}