declare global {
  interface Array<T> {
    flatMap<U>(
      callbackfn: (value: T, index: number, array: T[]) => U[] | undefined,
      thisArg?: any
    ): U[];
  }
}
export declare function maybePush<T = any>(list: T[], item: T): T[];