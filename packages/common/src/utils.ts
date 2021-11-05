export const notUndefined = <T>(x: T | undefined): x is T => x !== undefined;
export const notNull = <T>(x: T | null): x is T => x !== null;
export const isDefined = <T>(x: T): x is NonNullable<T> => notUndefined(x) && notNull(x);
