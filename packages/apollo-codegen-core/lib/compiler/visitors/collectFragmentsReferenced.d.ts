import { SelectionSet, Fragment } from "../";
export declare function collectFragmentsReferenced(
  selectionSet: SelectionSet,
  fragments: {
    [fragmentName: string]: Fragment;
  },
  fragmentsReferenced?: Set<string>
): Set<string>;