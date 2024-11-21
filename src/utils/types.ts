export type PokePageResponse = ExpandRecursively<{
  count: number;
  data: [
    {
      name: string;
      types: string[];
      sprite: string;
    },
  ];
}>;

export type PokeTypesResponse = {
  count: number;
  results: { name: string; url: string }[];
};

// https://stackoverflow.com/a/69288824/4110257
export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
    ? { [K in keyof O]: O[K] }
    : never;

export type ExpandRecursively<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandRecursively<A>) => ExpandRecursively<R>
  : T extends object
    ? T extends infer O
      ? { [K in keyof O]: ExpandRecursively<O[K]> }
      : never
    : T;
