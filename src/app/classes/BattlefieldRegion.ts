import { Unit } from './Unit';
import { Targetable } from '../interfaces/Targetable';
import { Skill } from './Skill';
import { ResourceInventory, Resource } from './Resource';

export class BattlefieldRegion implements Targetable {

    name: string;
    units: Unit[];
    resources: ResourceInventory;

    constructor(name: string) {
        this.name = name;
        this.units = [];
        this.resources = new ResourceInventory();
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
        unit.containingRegion = undefined;
    }

    applySkill(user: Unit, skill: Skill): void {
        for (const target of this.units) {
            target.applySkill(user, skill);
        }
    }

    addResource(resource: Resource, amount: number): void {
        this.resources = this.resources.add(resource, amount);
    }

}
