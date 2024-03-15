import { ListType } from "../components/list-block/list-data/list-type";

export interface FeatJSON {
  name: string,
  description: string,
}

export class Feat extends ListType {
  name: string;
  description: string;

  constructor(json: FeatJSON) {
    super();
    this.name = json.name;
    this.description = json.description;
  }

  get json() {
    return {
      name: this.name,
      description: this.description,
    }
}
}