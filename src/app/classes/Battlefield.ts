import * as Interfaces from '../interfaces/Battlefield';
import { BattlefieldRegion } from './BattlefieldRegion';
import { Unit } from './Unit';

export class Battlefield implements Interfaces.Battlefield {

    regions: BattlefieldRegion[];

    constructor(regions: BattlefieldRegion[]) {
        this.regions = regions;
    }

    moveUnit(unit: Unit, source: BattlefieldRegion, destination: BattlefieldRegion): void {
        if (!source.units.includes(unit)) {
            throw new Error('Can only remove unit from region it is in');
        }
        if (destination.units.includes(unit)) {
            throw new Error('Cannot move unit to region it is in');
        }
        source.removeUnit(unit);
        destination.addUnit(unit);
    }

}