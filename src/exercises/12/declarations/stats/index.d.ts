declare module 'stats' {
    type Comparator<T> = (value1: T, value2: T) => number;
    type GetIndex<T> = (input: Array<T>, comparator: Comparator) => number;
    type GetElement<T> = (input: Array<T>, comparator: Comparator) => T | null;
    export const getMaxIndex: GetIndex;
    export const getMaxElement: GetElement;
    export const getMinIndex: GetIndex;
    export const getMinElement: GetElement;
    export const getMedianIndex: GetIndex;
    export const getMedianElement: GetIndex;
    export function getAverageValue<T>(input: Array<T>, getValue: (item: T) => {}): number;
}
