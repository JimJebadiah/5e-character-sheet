import { ListType } from "../components/list-block/list-data/list-type";

export const ammunitionTypes = ['bullet', 'arrow'] as const;
export type AmmunitionType = typeof ammunitionTypes[number];

export interface ItemJSON {
    name: string,
    description: string,
    count: number,
    ammunitionType?: AmmunitionType;
}

export class Item extends ListType {
  name: string;
  description: string;
  count: number;
  ammunitionType?: AmmunitionType;

  constructor(json: ItemJSON) {
    super();
    this.name = json.name;
    this.description = json.description;
    this.count = json.count ?? 0;
    this.ammunitionType = json.ammunitionType;
  }

  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 0) this.count--;
  }

  get json(): ItemJSON {
    return {
        name: this.name,
        description: this.description,
        count: this.count,
        ammunitionType: this.ammunitionType
    }
  }
}
