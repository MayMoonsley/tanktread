import { Random } from '../util/Random';
import { Objects } from '../util/Objects';

export class Resource {

    public static readonly Aluminite = new Resource('Aluminite', 'Ambiguous metallic alloy. Cheap and ubiquitous.', 3);
    public static readonly Silicate = new Resource('Silicate', 'Clarified sand. Common computational substrate.', 3);
    public static readonly Petranol = new Resource('Petranol', 'Odorous liquid. Clean-burning fuel.', 2);
    public static readonly Cordylith = new Resource('Cordylith', 'Crystalline fungus mesh. Mood regulator in low doses.', 20);
    public static readonly Hide = new Resource('Hide', 'Miscellaneous creature dermis. Usable after processing.', 1);
    public static readonly Gristle = new Resource('Gristle', 'Low-quality creature flesh. Technically edible.', 1);
    public static readonly Nodule = new Resource('Nodule', 'Sucrose storage organ. Calorie dense.', 10);

    private constructor(public readonly name: string, public readonly description: string, public readonly value: number) {}

}

export type ResourceAmount = {resource: Resource; amount: number;};
export type ResourceDrop = {resource: Resource; min: number; max: number; chance?: number;};

export function resourceDropToAmount(drop: ResourceDrop): number {
    if (drop.chance === undefined || Random.boolean(drop.chance)) {
        return Random.int(drop.min, drop.max + 1);
    }
    return 0;
}

export class ResourceInventory {

    // TODO: make this type take a multitonKey instead of a string
    private readonly amounts: Record<string, number>;

    // TODO: this should ensure _arr has no duplicate entries
    constructor(amounts: Record<string, number> = {}) {
        this.amounts = amounts;
    }

    static fromAmounts(amounts: ResourceAmount[]): ResourceInventory {
        const record: Record<string, number> = {};
        for (const amount of amounts) {
            const key = Objects.multitonKey(Resource, amount.resource);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (record[key] === undefined) {
                record[key] = amount.amount;
            } else {
                record[key] += amount.amount;
            }
        }
        return new ResourceInventory(record);
    }

    get arr(): ResourceAmount[] {
        // TODO: replace this with multitonEntries once it's fixed
        const resourceEntries = Objects.safeEntries(Resource).filter(x => x[1] instanceof Resource);
        const r: ResourceAmount[] = [];
        for (const entry of resourceEntries) {
            const amount = this.getAmount(entry[1]);
            if (amount > 0) {
                r.push({ resource: entry[1], amount });
            }
        }
        return r;
    }

    getAmount(resource: Resource): number {
        const key = Objects.multitonKey(Resource, resource);
        const value = this.amounts[key];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (value !== undefined) {
            return value;
        }
        return 0;
    }

    add(resource: Resource, amount: number): ResourceInventory {
        const key = Objects.multitonKey(Resource, resource);
        const newRecord = { ...this.amounts };
        newRecord[key] = this.getAmount(resource) + amount;
        return new ResourceInventory(newRecord);
    }

    remove(resource: Resource, amount: number): ResourceInventory {
        const key = Objects.multitonKey(Resource, resource);
        const newRecord = { ...this.amounts };
        newRecord[key] = this.getAmount(resource) + amount;
        if (newRecord[key]! <= 0) {
            delete newRecord[key];
        }
        return new ResourceInventory(newRecord);
    }

    combine(other: ResourceInventory): ResourceInventory {
        const newRecord: Record<string, number> = {};
        const resourceEntries = Objects.safeEntries(Resource).filter(x => x[1] instanceof Resource);
        for (const entry of resourceEntries) {
            newRecord[entry[0]] = this.getAmount(entry[1]) + other.getAmount(entry[1]);
        }
        return new ResourceInventory(newRecord);
    }

    removeAll(other: ResourceInventory): ResourceInventory {
        const newRecord: Record<string, number> = {};
        const resourceEntries = Objects.safeEntries(Resource).filter(x => x[1] instanceof Resource);
        for (const entry of resourceEntries) {
            const newAmount = this.getAmount(entry[1]) - other.getAmount(entry[1]);
            if (newAmount > 0) {
                newRecord[entry[0]] = newAmount;
            }
        }
        return new ResourceInventory(newRecord);
    }

    canAfford(other: ResourceInventory): boolean {
        const resourceEntries = Objects.safeEntries(Resource).filter(x => x[1] instanceof Resource);
        for (const entry of resourceEntries) {
            if (other.getAmount(entry[1]) > this.getAmount(entry[1])) {
                return false;
            }
        }
        return true;
    }

    toString(): string {
        return this.arr.map(item => `${item.resource.name} ×${item.amount}`).join('\n');
    }

}