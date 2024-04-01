export abstract class ListType {}

export function copyList<T extends ListType>(type: ListType): ListType {
  const o: object = {};
  Object.assign(o, type);
  return o as T;
}
