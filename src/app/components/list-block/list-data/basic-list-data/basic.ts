import { ListType } from '../list-type';

export class Basic extends ListType {
  val: string;

  constructor(val: string) {
    super();
    this.val = val;
  } 
}