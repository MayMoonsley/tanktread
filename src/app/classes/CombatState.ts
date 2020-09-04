import { Battlefield } from './Battlefield';

export class CombatState {

    constructor(public battlefield: Battlefield) {};

    advanceTurn(): void {
        for (let unit of this.battlefield.getAllUnits()) {
            unit.advanceTurn();
        }
    }

}