type ListItem<T extends any[]> = T extends (infer U)[] ? U : never;

export type MapWorkerType = <List extends any[], U>(
  arr: List,
  cb: (val: ListItem<List>) => U | Promise<U>
) => Promise<U[]>;
