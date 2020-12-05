import { Unit } from './Unit';
import { UnitSpecies } from './UnitSpecies';
import { Targetable } from '../interfaces/Targetable';
import { ResourceInventory, Resource } from './Resource';
import { AIRating, combineRatings } from '../interfaces/AIRating';
import { Status } from './Status';

export class BattlefieldRegion implements Targetable {

    targetable: true = true;

    name: string;
    units: Unit[];
    resources: ResourceInventory;

    constructor(name: string) {
        this.name = name;
        this.units = [];
        this.resources = new ResourceInventory();
    }

    get rating(): AIRating {
        return combineRatings(...this.units.map(unit => unit.rating));
    }

    addUnit(unit: Unit): void {
        if (this.units.includes(unit)) {
            throw new Error('Unit cannot exist in a region twice');
        }
        this.units.unshift(unit);
        unit.containingRegion = this;
    }

    removeUnit(unit: Unit): void {
        if (!this.units.includes(unit)) {
            throw new Error('Cannot remove Unit from a region it\'s not in');
        }
        this.units.splice(this.units.indexOf(unit), 1);
        unit.containingRegion = undefined;
    }

    addResource(resource: Resource, amount: number): void {
        this.resources = this.resources.add(resource, amount);
    }

    collectResources(): ResourceInventory {
        const temp = this.resources;
        this.resources = new ResourceInventory();
        return temp;
    }

}
