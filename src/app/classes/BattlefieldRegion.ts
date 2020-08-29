import { Unit } from './Unit';

export class BattlefieldRegion {

    name: string;
    units: Unit[];

    constructor(name: string, units: Unit[] = []) {
        this.name = name;
        this.units = units;
    }

    addUnit(unit: Unit): void {
        if (this.units.includes(unit)) {
            throw new Error('Unit cannot exist in a region twice');
        }
        this.units.push(unit);
    }

    removeUnit(unit: Unit): void {
        if (!this.units.includes(unit)) {
            throw new Error('Cannot remove Unit from a region it\'s not in');
        }
        this.units.splice(this.units.indexOf(unit), 1);
    }

}