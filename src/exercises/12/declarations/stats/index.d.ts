declare module 'stats' {
    type Comparator<T> = (value1: T, value2: T) => number;
    type GetIndex = <T>(input: Array<T>, comparator: Comparator<T>) => number;
    type GetElement = <T>(input: Array<T>, comparator: Comparator<T>) => T | null;
    export const getMaxIndex: GetIndex;
    export const getMaxElement: GetElement;
    export const getMinIndex: GetIndex;
    export const getMinElement: GetElement;
    export const getMedianIndex: GetIndex;
    export const getMedianElement: GetElement;
    export const getAverageValue: <T>(input: Array<T>, getValue: (item: T) => number) => number | null;
}

/** ????????????????
 * 
 * function getAverageValue(input, getValue) {
    if (input.length === 0) {
        return null;
    }
    return input.reduce(
        function (result, item) {
            return result + getValue(item);
        },
        0
    ) / input.length;
}
 */