import { Resource, ResourceInventory } from '../classes/Resource';
import { UnitSpecies } from '../classes/UnitSpecies';

export class InventoryState {

    credits: number;
    debt: number;
    resources: ResourceInventory;
    schematics: UnitSpecies[];

    constructor() {
        this.credits = 0;
        this.debt = 5000;
        this.resources = new ResourceInventory();
        this.schematics = [UnitSpecies.Stinger];
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

    canAfford(resources: ResourceInventory): boolean {
        return this.resources.canAfford(resources);
    }

    addResourceInventory(resources: ResourceInventory): void {
        this.resources = this.resources.combine(resources);
    }

    removeResourceInventory(resources: ResourceInventory): void {
        this.resources = this.resources.removeAll(resources);
    }

    addSchematic(species: UnitSpecies): void {
        if (this.schematics.includes(species)) {
            return;
        }
        this.schematics.push(species);
    }

}