import { Random } from '../util/Random';

export class Resource {

    public static readonly Aluminite = new Resource('Aluminite', 'Ambiguous metallic alloy. Cheap and ubiquitous.');
    public static readonly Silicate = new Resource('Silicate', 'Clarified sand. Common computational substrate.');
    public static readonly Petranol = new Resource('Petranol', 'Odorous liquid. Clean-burning fuel.');
    public static readonly Hide = new Resource('Hide', 'Miscellaneous creature dermis. Usable after processing.');

    private constructor(public name: string, public description: string) {}

}

export type ResourceAmount = {resource: Resource, amount: number};
export type ResourceDrop = {resource: Resource, min: number, max: number};

export function resourceDropToAmount(drop: ResourceDrop): number {
    return Random.int(drop.min, drop.max + 1);
}

export class ResourceInventory {

    private readonly _arr: ResourceAmount[];

    // TODO: this should ensure _arr has no duplicate entries
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

    // TODO: make this more efficient
    combine(other: ResourceInventory): ResourceInventory {
        let acc: ResourceInventory = this;
        for (let item of other._arr) {
            acc = acc.add(item.resource, item.amount);
        }
        return acc;
    }

    removeAll(other: ResourceInventory): ResourceInventory {
        let acc: ResourceInventory = this;
        for (let item of other._arr) {
            acc = acc.remove(item.resource, item.amount);
        }
        return acc;
    }

    canAfford(other: ResourceInventory): boolean {
        for (let item of other._arr) {
            if (this.getAmount(item.resource) < item.amount) {
                return false;
            }
        }
        return true;
    }

    toString(): string {
        return this._arr.map(item => `${item.resource.name} ×${item.amount}`).join('\n');
    }

}