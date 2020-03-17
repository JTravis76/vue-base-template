

interface Array<T> extends ArrayConstructor {
    /**Swap values for two array indexes.
     * @param firstIndex The index of first value.
     * @param secondIndex The index of second value.
     */
    swapValues(firstIndex: number, secondIndex: number): Array<T>;

    /**Check that array is not (undefined, null or length < 1).*/
    isInitializedWithData(): boolean;

    /** Filters a sequence of values based on a predicate
     * @param filter A function to test each element for a condition.
     * @returns Array
     */
    where(filter: Function): Array<T>;
    select(filter: Function): Array<T>;
    firstOrDefault(filter: Function): Array<T>;
    lastOrDefault(filter: Function): Array<T>;
    take(number: number): Array<T>;
    takeWhile(filter: Function): Array<T>;
    skip(number: number): Array<T>;
    skipWhile(filter: Function): Array<T>;
    orderBy(filter: Function): Array<T>;
    orderByDesc(filter: Function): Array<T>;
    groupBy(filter: Function): Array<T>;
    removeAt(index: number): Array<T>;
    any(filter: Function): boolean;
    all(filter: Function): boolean;
    max(selector: Function): number;
    min(selector: Function): number;
    average(selector: Function): number;
}

// declare module 'linq' {
//   export = Linq;
// }