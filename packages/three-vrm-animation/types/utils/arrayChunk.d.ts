/**
 * ```js
 * arrayChunk( [ 1, 2, 3, 4, 5, 6 ], 2 )
 * // will be
 * [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
 * ```
 */
export declare function arrayChunk<T>(array: ArrayLike<T>, every: number): T[][];
