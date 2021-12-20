/*

Intro:

    For some unknown reason most of our developers left
    the company. We need to actively hire now.
    In the media we've read that companies that invent
    and publish new technologies attract more potential
    candidates. We need to use this opportunity and
    invent and publish some npm packages. Following the
    new trend of functional programming in JS we
    decided to develop a functional utility library.
    This will put us on the bleading edge since we are
    pretty much sure no one else did anything similar.
    We also provided some jsdoc along with the
    functions, but it might sometimes be inaccurate.

Exercise:

    Provide proper typing for the specified functions.

Bonus:

    Could you please also refactor the code to reduce
    code duplication?
    You might need some excessive type casting to make
    it really short.

*/

export type Mapper<T, U> = (value: T, index: number, array: T[]) => U;
export type MapFunction<T, U> = (
    mapper?: Mapper<T, U>,
    input?: Array<T>
) => Array<U> | MapFunction<T, U> | SubMapFunction<T, U>;
export type SubMapFunction<T, U> = (input?: Array<T>) => Array<U> | SubMapFunction<T, U>;

export function map<T, U>(): MapFunction<T, U>;
export function map<T, U>(mapper: Mapper<T, U>): SubMapFunction<T, U>;
export function map<T, U>(mapper: Mapper<T, U>, input: Array<T>): Array<U>;

// export function subFunction<T, U>() : SubMapFunction<T, U>;
// export function subFunction<T, U>(subInput: Array<T>) : Array<U>;

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being mapped using
 * the specified mapper.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being mapped using original mapper.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} mapper
 * @param {Array} input
 * @return {Array | Function}
 */
export function map<T, U>(
    mapper?: Mapper<T, U>,
    input?: Array<T>
): Array<U> | MapFunction<T, U> | SubMapFunction<T, U> {
    if (arguments.length === 0) {
        return map; //MapFunction<T, U>
    }
    if (arguments.length === 1) {
        return function subFunction(subInput?: Array<T>) {
            if (arguments.length === 0) {
                return subFunction; //SubMapFunction<T, U>
            }
            return subInput.map(mapper); //Array<U>
        };
    }
    return input.map(mapper); //Array<U>
}

export type Filterer<T> = (value: T, index: number, array: T[]) => unknown;
export type FilterFunction<T> = (
    filterer?: Filterer<T>,
    input?: Array<T>
) => Array<T> | SubFiltererFunction<T> | FilterFunction<T>;
export type SubFiltererFunction<T> = (input?: Array<T>) => Array<T> | SubFiltererFunction<T>;

export function filter<T, U>(): FilterFunction<T>;
export function filter<T, U>(filterer: Filterer<T>): SubFiltererFunction<T>;
export function filter<T, U>(filterer: Filterer<T>, input: Array<T>): Array<T>;

/**
 * 2 arguments passed: returns a new array
 * which is a result of input being filtered using
 * the specified filter function.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being filtered using original filter
 * function.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} filterer
 * @param {Array} input
 * @return {Array | Function}
 */
export function filter<T, U>(
    filterer?: Filterer<T>,
    input?: Array<T>
): Array<T> | SubFiltererFunction<T> | FilterFunction<T> {
    if (arguments.length === 0) {
        return filter; //FilterFunction<T>
    }
    if (arguments.length === 1) {
        return function subFunction(subInput) {
            if (arguments.length === 0) {
                return subFunction; //SubFiltererFunction<T>
            }
            return subInput.filter(filterer); //Array<T>
        };
    }
    return input.filter(filterer); //Array<T>
}

export type Reducer = () => unknown;
export type ReduceFunction<T> = (reducer?: Reducer, initialValue?: T, input?: Array<T>) => unknown | ReduceFunction<T>;

export function reduce<T>(): ReduceFunction<T>;
export function reduce<T>(reducer: Reducer): unknown;
export function reduce<T>(reducer: Reducer, initialValue: T): unknown;
export function reduce<T>(reducer: Reducer, initialValue: T, input: Array<T>): unknown;

/**
 * 3 arguments passed: reduces input array it using the
 * specified reducer and initial value and returns
 * the result.
 *
 * 2 arguments passed: returns a function which accepts
 * input array and reduces it using previously specified
 * reducer and initial value and returns the result.
 *
 * 1 argument passed: returns a function which:
 *   * when 2 arguments is passed to the subfunction, it
 *     reduces the input array using specified initial
 *     value and previously specified reducer and returns
 *     the result.
 *   * when 1 argument is passed to the subfunction, it
 *     returns a function which expects the input array
 *     and reduces the specified input array using
 *     previously specified reducer and inital value.
 *   * when 0 argument is passed to the subfunction, it
 *     returns itself.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} reducer
 * @param {*} initialValue
 * @param {Array} input
 * @return {* | Function}
 */
export function reduce<T>(reducer?: Reducer, initialValue?: T, input?: Array<T>): unknown | ReduceFunction<T> {
    if (arguments.length === 0) {
        return reduce;
    }
    if (arguments.length === 1) {
        return function subFunction(subInitialValue, subInput: Array<T>) {
            if (arguments.length === 0) {
                return subFunction;
            }
            if (arguments.length === 1) {
                return function subSubFunction(subSubInput) {
                    if (arguments.length === 0) {
                        return subSubFunction;
                    }
                    return subSubInput.reduce(reducer, subInitialValue);
                };
            }
            return subInput.reduce(reducer, subInitialValue);
        };
    }
    if (arguments.length === 2) {
        return function subFunction(subInput) {
            if (arguments.length === 0) {
                return subFunction;
            }
            return subInput.reduce(reducer, initialValue);
        };
    }
    return input.reduce(reducer, initialValue);
}

export type AddSubstractFunction = (a?: number, b?: number) => number | AddSubstractFunction | SubAddSubstractFunction;
export type SubAddSubstractFunction = (subB?: number) => number | SubAddSubstractFunction;

export function add(): AddSubstractFunction;
export function add(a: number): number | SubAddSubstractFunction;
export function add(a: number, b: number): number;

// export function subFunction(): SubAddFunction;
// export function subFunction(subB: number): number;

/**
 * 2 arguments passed: returns sum of a and b.
 *
 * 1 argument passed: returns a function which expects
 * b and returns sum of a and b.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */
export function add(a?: number, b?: number): number | AddSubstractFunction | SubAddSubstractFunction {
    if (arguments.length === 0) {
        return add;
    }
    if (arguments.length === 1) {
        return function subFunction(subB?: number): number | SubAddSubstractFunction {
            if (arguments.length === 0) {
                return subFunction;
            }
            return a + subB;
        };
    }
    return a + b;
}

/**
 * 2 arguments passed: subtracts b from a and
 * returns the result.
 *
 * 1 argument passed: returns a function which expects
 * b and subtracts b from a and returns the result.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number | Function}
 */
export function subtract(a?: number, b?: number): number | AddSubstractFunction | SubAddSubstractFunction {
    if (arguments.length === 0) {
        return subtract;
    }
    if (arguments.length === 1) {
        return function subFunction(subB?: number): number | SubAddSubstractFunction {
            if (arguments.length === 0) {
                return subFunction;
            }
            return a - subB;
        };
    }
    return a - b;
}

export type PropFunction = (obj?: Object, propName?: string) => PropFunction | unknown | SubPropFunction;
export type SubPropFunction = (subPropName?: string) => SubPropFunction | unknown;

export function prop(): PropFunction;
export function prop(obj: Object): SubPropFunction | unknown;
export function prop(obj: Object, propName: string): unknown;

/**
 * 2 arguments passed: returns value of property
 * propName of the specified object.
 *
 * 1 argument passed: returns a function which expects
 * propName and returns value of property propName
 * of the specified object.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Object} obj
 * @param {String} propName
 * @return {* | Function}
 */
export function prop(obj?: Object, propName?: string): PropFunction | unknown | SubPropFunction {
    if (arguments.length === 0) {
        return prop; //PropFunction
    }
    if (arguments.length === 1) {
        return function subFunction(subPropName?: string): SubPropFunction | unknown {
            if (arguments.length === 0) {
                return subFunction; //SubPropFunction
            }
            return obj[subPropName]; //unknown
        };
    }
    return obj[propName]; //unknown
}

export type PipeFunction<A> = (functions?: A) => PipeFunction<A> | SubPipeFunction;
export type SubPipeFunction = (functions?: Array<() => unknown>) => any;
export type ParameterFunction = () => unknown;

export function pipe(): PipeFunction;
export function pipe(f1: ParameterFunction): SubPipeFunction;
export function pipe(f1: ParameterFunction, f2: ParameterFunction): SubPipeFunction;
export function pipe(f1: ParameterFunction, f2: ParameterFunction, f3: ParameterFunction): SubPipeFunction;
export function pipe(
    f1: ParameterFunction,
    f2: ParameterFunction,
    f3: ParameterFunction,
    f4: ParameterFunction
): SubPipeFunction;
export function pipe(
    f1: ParameterFunction,
    f2: ParameterFunction,
    f3: ParameterFunction,
    f4: ParameterFunction,
    f5: ParameterFunction
): SubPipeFunction;
/**
 * >0 arguments passed: expects each argument to be
 * a function. Returns a function which accepts the
 * same arguments as the first function. Passes these
 * arguments to the first function, the result of
 * the first function passes to the second function,
 * the result of the second function to the third
 * function... and so on. Returns the result of the
 * last function execution.
 *
 * 0 arguments passed: returns itself.
 *
 * TODO TypeScript
 *   * Should properly handle at least 5 arguments.
 *   * Should also make sure argument of the next
 *     function matches the return type of the previous
 *     function.
 *
 * @param {Function[]} functions
 * @return {*}
 */
export function pipe(...functions) {
    if (arguments.length === 0) {
        return pipe; //PipeFunction
    }
    return function subFunction() {
        let nextArguments = Array.from(arguments);
        let result;
        for (const func of functions) {
            result = func(...nextArguments);
            nextArguments = [result];
        }
        return result;
    };
}
