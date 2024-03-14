export abstract class ListType {
  from(type: ListType) {
    console.log(type);
    Object.assign(this, type);
  }
}