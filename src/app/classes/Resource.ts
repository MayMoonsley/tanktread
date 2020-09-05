import { Random } from '../util/Random';

export class Resource {

    public static readonly Aluminite = new Resource('Aluminite', 'Ambiguous metallic alloy. Cheap and ubiquitous');
    public static readonly Silicate = new Resource('Silicate', 'Clarified sand. Common computational substrate.');

    private constructor(public name: string, public description: string) {}

}

export type ResourceAmount = {resource: Resource, amount: number};
export type ResourceDrop = {resource: Resource, min: number, max: number};

export function resourceDropToAmount(drop: ResourceDrop): number {
    return Random.int(drop.min, drop.max + 1);
}

export class ResourceInventory {

    private readonly _arr: ResourceAmount[];

    constructor(_arr: ResourceAmount[] = []) {
        this._arr = _arr.filter(item => item.amount > 0).sort();
    }

    get arr(): ResourceAmount[] {
        return this._arr;
    }

    getAmount(resource: Resource): number {
        for (let item of this._arr) {
            if (item.resource === resource) {
                return item.amount;
            }
        }
        return 0;
    }

    add(resource: Resource, amount: number): ResourceInventory {
        const newArr: ResourceAmount[] = [];
        let resourceAdded: boolean = false;
        for (let item of this._arr) {
            if (item.resource === resource) {
                resourceAdded = true;
                newArr.push({resource: item.resource, amount: amount + item.amount});
            } else {
                newArr.push({resource: item.resource, amount: item.amount});
            }
        }
        if (!resourceAdded) {
            newArr.push({resource, amount});
        }
        return new ResourceInventory(newArr);
    }

    remove(resource: Resource, amount: number): ResourceInventory {
        const newArr: ResourceAmount[] = [];
        for (let item of this._arr) {
            if (item.resource === resource) {
                newArr.push({resource: item.resource, amount: Math.max(amount + item.amount, 0)});
            } else {
                newArr.push({resource: item.resource, amount: item.amount});
            }
        }
        return new ResourceInventory(newArr);
    }

    toString(): string {
        return this._arr.map(item => `${item.resource.name} (${item.amount})`).join('\n');
    }

}