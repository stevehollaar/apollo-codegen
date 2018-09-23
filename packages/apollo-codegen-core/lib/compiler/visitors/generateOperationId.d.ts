import { Operation, Fragment } from "../";
export declare function generateOperationId(
  operation: Operation,
  fragments: {
    [fragmentName: string]: Fragment;
  },
  fragmentsReferenced?: Iterable<string>
): {
  operationId: string;
  sourceWithFragments: string;
};