export enum Attributes {
    STR = 'strength',
    DEX = 'dexterity',
    CON = 'constitution',
    INT = 'intelligence',
    WIS = 'wisdom',
    CHA = 'charisma'
}

export interface AttributeJSON {
    readonly name: string,
    value: number;
    readonly proficient: boolean;
}

export class Attribute {
    readonly name: string;
    value: number;
    readonly proficient: boolean;
    
    constructor(json: AttributeJSON) {
        this.name = json.name;
        this.value = json.value;
        this.proficient = json.proficient;
    }

    get modifier() {
        return Math.floor((this.value - 10) / 2);
    }

    get json() {
        return {
            name: this.name,
            value: this.value,
            proficient: this.proficient
        }
    }
}