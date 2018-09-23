import { GraphQLObjectType } from "graphql";
import { SelectionSet, Selection, Field, FragmentSpread } from "../";
export declare class Variant implements SelectionSet {
  possibleTypes: GraphQLObjectType[];
  selections: Selection[];
  fragmentSpreads: FragmentSpread[];
  constructor(
    possibleTypes: GraphQLObjectType[],
    selections?: Selection[],
    fragmentSpreads?: FragmentSpread[]
  );
  readonly fields: Field[];
  inspect(): string;
}
export declare function typeCaseForSelectionSet(
  selectionSet: SelectionSet,
  mergeInFragmentSpreads?: boolean
): TypeCase;
export declare class TypeCase {
  default: Variant;
  private variantsByType;
  readonly variants: Variant[];
  readonly defaultAndVariants: Variant[];
  readonly remainder: Variant | undefined;
  readonly exhaustiveVariants: Variant[];
  constructor(possibleTypes: GraphQLObjectType[]);
  disjointVariantsFor(possibleTypes: GraphQLObjectType[]): Variant[];
  merge(
    otherTypeCase: TypeCase,
    transform?: (selectionSet: SelectionSet) => Selection[]
  ): void;
  inspect(): string;
}