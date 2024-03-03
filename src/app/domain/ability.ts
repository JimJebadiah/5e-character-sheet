export type Recharge = 'short' | 'long';

export interface AbilityJSON {
    name: string,
    description: string,
    maxCharges: number,
    charges: number,
    rechargeOn: Recharge,
}

export class Ability {
    name: string;
    description: string;
    maxCharges: number;
    charges: number;
    rechargeOn: Recharge;

    constructor(json: AbilityJSON) {
        this.name = json.name;
        this.description = json.description;
        this.maxCharges = json.maxCharges;
        this.charges = json.charges;
        this.rechargeOn = json.rechargeOn;
    }

    canUse(): boolean {
        return this.charges > 0;
    }

    use() {
        if (this.canUse()) {
            this.charges--;
        }
    }

    recharge() {
        this.charges = this.maxCharges;
    }

    get json() {
        return {
            name: this.name,
            description: this.description,
            maxCharges: this.maxCharges,
            charges: this.charges,
            rechargeOn: this.rechargeOn
        }
    }
}