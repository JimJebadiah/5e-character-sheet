export abstract class ListType {
  from(type: ListType) {
    Object.assign(this, type);
  }
}