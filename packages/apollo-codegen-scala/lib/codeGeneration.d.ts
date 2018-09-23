import CodeGenerator from "apollo-codegen-core/lib/utilities/CodeGenerator";
import {
  LegacyCompilerContext,
  LegacyOperation,
  LegacyFragment,
  LegacyField,
  LegacyInlineFragment
} from "apollo-codegen-core/lib/compiler/legacyIR";
import { GraphQLType } from "graphql";
import { Property } from "./language";
import { GraphQLCompositeType } from "graphql";
export declare function generateSource(context: LegacyCompilerContext): string;
export declare function classDeclarationForOperation(
  generator: CodeGenerator<LegacyCompilerContext, any>,
  {
    operationName,
    operationType,
    rootType,
    variables,
    fields,
    inlineFragments,
    fragmentSpreads,
    fragmentsReferenced,
    source,
    operationId
  }: LegacyOperation
): void;
export declare function caseClassDeclarationForFragment(
  generator: CodeGenerator<LegacyCompilerContext, any>,
  {
    fragmentName,
    typeCondition,
    fields,
    inlineFragments,
    fragmentSpreads,
    source
  }: LegacyFragment
): void;
export declare function caseClassDeclarationForSelectionSet(
  generator: CodeGenerator<LegacyCompilerContext, any>,
  {
    caseClassName,
    parentType,
    fields,
    inlineFragments,
    fragmentSpreads,
    viewableAs
  }: {
    caseClassName: string;
    parentType: GraphQLCompositeType;
    fields: LegacyField[];
    inlineFragments?: LegacyInlineFragment[];
    fragmentSpreads?: string[];
    viewableAs?: {
      caseClassName: string;
      properties: (LegacyField & Property)[];
    };
  },
  objectClosure?: () => void
): void;
export declare function typeDeclarationForGraphQLType(
  generator: CodeGenerator<LegacyCompilerContext, any>,
  type: GraphQLType
): void;