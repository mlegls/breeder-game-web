export const scan = <T, U>(f: (acc: U, x: T) => U, acc: U, xs: T[]): U[] =>
  xs.reduce((acc, x) => [...acc, f(acc[acc.length - 1], x)], [acc]);

export const padSlice = <T>(xs: T[], n: number) =>
  xs.length < n ? [...xs, ...Array(n - xs.length).fill(null)] : xs.slice(0, n);
