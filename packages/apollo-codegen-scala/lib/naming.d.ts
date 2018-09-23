import { Property } from "./language";
import {
  LegacyCompilerContext,
  LegacyField,
  LegacyInlineFragment
} from "apollo-codegen-core/lib/compiler/legacyIR";
import { GraphQLInputField } from "graphql";
export declare function enumCaseName(name: string): string;
export declare function operationClassName(name: string): string;
export declare function caseClassNameForPropertyName(
  propertyName: string
): string;
export declare function caseClassNameForFragmentName(
  fragmentName: string
): string;
export declare function caseClassNameForInlineFragment(
  inlineFragment: LegacyInlineFragment
): string;
export declare function propertyFromInputField(
  context: LegacyCompilerContext,
  field: GraphQLInputField,
  namespace?: string,
  parentCaseClassName?: string
): GraphQLInputField & Property;
export declare function propertyFromLegacyField(
  context: LegacyCompilerContext,
  field: LegacyField,
  namespace?: string,
  parentCaseClassName?: string
): LegacyField & Property;
