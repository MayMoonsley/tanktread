import { Resource, ResourceInventory } from '../classes/Resource';
import { UnitSpecies } from '../classes/Unit';

export class InventoryState {

    credits: number;
    resources: ResourceInventory;
    schematics: UnitSpecies[];

    constructor() {
        this.credits = 0;
        this.resources = new ResourceInventory();
        this.schematics = [UnitSpecies.Scuttledrone];
    }

    addCredits(amount: number): void {
        this.credits += amount;
    }

    removeCredits(amount: number): void {
        this.credits -= amount;
        this.credits = Math.max(0, this.credits);
    }

    addResource(resource: Resource, amount: number): void {
        this.resources = this.resources.add(resource, amount);
    }

    removeResource(resource: Resource, amount: number): void {
        this.resources = this.resources.remove(resource, amount);
    }

    addResourceInventory(resources: ResourceInventory): void {
        this.resources = this.resources.combine(resources);
    }

    addSchematic(species: UnitSpecies): void {
        if (this.schematics.includes(species)) {
            return;
        }
        this.schematics.push(species);
    }

}