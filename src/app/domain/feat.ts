export interface FeatJSON {
    name: string,
    description: string,
}

export class Feat {
    name: string;
    description: string;

    constructor(json: FeatJSON) {
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