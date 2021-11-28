import { InvalidNumberParameter } from './apiError';

type ReturnType<T extends Record<string, string | undefined>> = Record<
  keyof T,
  T[keyof T] extends string | undefined ? number | undefined : number
>;

function parseQuery<T extends Record<string, string | undefined>>(input: T): ReturnType<T> {
  const entries = Object.entries(input);

  return Object.fromEntries(
    entries
      .map(([key, value]) => [key, typeof value === 'string' ? parseInt(value, 10) : value])
      .map(([key, value]) => {
        if (typeof value === 'number' && Number.isNaN(value)) {
          throw new InvalidNumberParameter(`${key} is not a number`);
        }

        return [key, value];
      }),
  ) as ReturnType<T>;
}

export default parseQuery;
