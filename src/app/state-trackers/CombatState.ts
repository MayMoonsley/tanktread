import { Battlefield } from '../classes/Battlefield';
import { Unit } from '../classes/Unit';
import { UnitFaction } from '../interfaces/Unit';

export class CombatState {

    constructor(public tank: Unit, public battlefield: Battlefield) {}

    advanceTurn(): void {
        for (const unit of this.battlefield.getAllUnits()) {
            unit.advanceTurn();
        }
    }

    canRetreat(): boolean {
        return this.tank.containingRegion === this.battlefield.regions[0];
    }

    canPackUp(): boolean {
        return this.battlefield.getAllUnitsOfFaction(UnitFaction.Creature).length === 0;
    }

}