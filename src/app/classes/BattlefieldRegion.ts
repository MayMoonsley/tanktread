import { Unit } from './Unit';
import { Skill } from './Skill';
import { Targetable } from '../interfaces/Targetable';

export class BattlefieldRegion implements Targetable {

    name: string;
    units: Unit[];

    constructor(name: string) {
        this.name = name;
        this.units = [];
    }

    addUnit(unit: Unit): void {
        if (this.units.includes(unit)) {
            throw new Error('Unit cannot exist in a region twice');
        }
        this.units.push(unit);
        unit.containingRegion = this;
    }

    removeUnit(unit: Unit): void {
        if (!this.units.includes(unit)) {
            throw new Error('Cannot remove Unit from a region it\'s not in');
        }
        this.units.splice(this.units.indexOf(unit), 1);
        unit.containingRegion = null;
    }

    applySkill(user: Unit, skill: Skill): void {
        for (let target of this.units) {
            target.applySkill(user, skill);
        }
    }

}
