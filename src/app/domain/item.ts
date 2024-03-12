export interface ItemJSON {
    name: string,
    description: string,
    count: number,
    ammunition?: boolean;
}

export class Item {
    name: string;
    description: string;
    count: number;
    ammunition: boolean;

    constructor(json: ItemJSON) {
        this.name = json.name;
        this.description = json.description;
        this.count = json.count ?? 0;
        this.ammunition = json.ammunition ?? false;
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
            ammunition: this.ammunition
        }
    }
}
