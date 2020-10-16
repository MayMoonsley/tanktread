import { BattlefieldRegion } from './BattlefieldRegion';
import { Skill } from './Skill';
import { Status } from './Status';
import { Arrays } from '../util/Arrays';
import { ResourceDrop, resourceDropToAmount, ResourceInventory, Resource } from './Resource';
import * as Interfaces from '../interfaces/Unit';

export class Unit implements Interfaces.Unit {

    targetable: true = true;

    name: string;
    health: number;
    maxHealth: number;
    skills: Skill[];
    statuses: Status[];
    drops: ResourceDrop[];
    containingRegion?: BattlefieldRegion = undefined;
    actionsLeft: number;
    actionsPerTurn: number;
    alive: boolean = true;
    faction: Interfaces.UnitFaction;

    constructor(name: string, faction: Interfaces.UnitFaction, health: number, actionsPerTurn: number, skills: Skill[] = [], drops: ResourceDrop[] = [], statuses: Status[] = []) {
        this.name = name;
        this.faction = faction;
        this.health = health;
        this.maxHealth = health;
        this.skills = skills;
        this.statuses = [];
        this.drops = drops;
        this.actionsPerTurn = actionsPerTurn;
        this.actionsLeft = actionsPerTurn;
        // add each status (effectively cloning input array)
        for (const status of statuses) {
            this.addStatus(status);
        }
    }

    get formattedName(): string {
        let r: string = `${this.faction} ${this.name}`;
        if (this.statuses.length > 0) {
            r += ` ${this.statuses.map(status => status.emoji).join('')}`;
        }
        return r;
    }

    get statString(): string {
        return `❤️ ${this.health}/${this.maxHealth} ⚡ ${this.actionsLeft}/${this.actionsPerTurn}`;
    }

    get playerControlled(): boolean {
        const usuallyPlayerControlled = this.faction === Interfaces.UnitFaction.Drone || this.faction === Interfaces.UnitFaction.Tank;
        if (this.statuses.includes(Status.MindControl)) {
            return !usuallyPlayerControlled;
        }
        return usuallyPlayerControlled;
    }

    get buildCost(): ResourceInventory {
        return ResourceInventory.fromAmounts(this.drops.map(item => { return { resource: item.resource, amount: item.max }; }));
    }

    wound(x: number, piercing: boolean = false): void {
        if (this.statuses.includes(Status.Armored) && !piercing) {
            x = Math.max(0, x - 1);
        }
        this.health -= x;
        if (this.health <= 0) {
            this.die();
        }
    }

    die(dropItems: boolean = true): void {
        if (!this.alive) {
            return;
        }
        if (this.health === Infinity) {
            return;
        }
        if (this.containingRegion !== undefined) {
            if (dropItems) {
                for (const drop of this.drops) {
                    this.containingRegion.addResource(drop.resource, resourceDropToAmount(drop));
                }
            }
            this.containingRegion.removeUnit(this);
        }
        this.alive = false;
    }

    heal(x: number): void {
        this.health += x;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    moveTo(region: BattlefieldRegion): void {
        if (this.containingRegion) {
            this.containingRegion.removeUnit(this);
        }
        region.addUnit(this);
    }

    canAct(): boolean {
        return this.actionsLeft > 0 || this.statuses.includes(Status.Advantage);
    }

    addActions(amount: number): void {
        this.actionsLeft = Math.min(this.actionsLeft + amount, this.actionsPerTurn);
    }

    spendAction(): void {
        if (this.actionsLeft > 0) {
            this.actionsLeft--;
        } else if (this.statuses.includes(Status.Advantage)) {
            this.removeStatus(Status.Advantage);
        }
    }

    addStatus(status: Status): void {
        this.statuses = Arrays.addWithoutDuplicate(status, this.statuses);
    }

    removeStatus(status: Status): void {
        this.statuses = Arrays.removeFrom(status, this.statuses);
    }

    advanceTurn(): void {
        this.actionsLeft = this.actionsPerTurn;
        if (this.statuses.includes(Status.Fire)) {
            this.wound(1, true);
        }
    }

}

export class UnitSpecies {

    // The Tank
    public static readonly Tank = new UnitSpecies('Tank', Interfaces.UnitFaction.Tank, Infinity, 2,
        [Skill.Move, Skill.Collect, Skill.Deconstruct], []);

    // Drones
    public static readonly Stinger = new UnitSpecies('Stinger', Interfaces.UnitFaction.Drone, 1, 2, [Skill.Move, Skill.Sting, Skill.Collect], []);

    public static readonly Detonator = new UnitSpecies('Detonator', Interfaces.UnitFaction.Drone,
        1, 2, [Skill.Move, Skill.Detonate], [{ resource: Resource.Petranol, min: 1, max: 3, chance: 0 }]);

    public static readonly Controller = new UnitSpecies('Controller', Interfaces.UnitFaction.Drone,
        1, 2, [Skill.Move, Skill.Hypnotize], [{ resource: Resource.Cordylith, min: 1, max: 1, chance: 0 }]);

    // Creatures
    public static readonly Rat = new UnitSpecies('Rat', Interfaces.UnitFaction.Creature, 1, 1, [Skill.Move, Skill.Gnaw],
        [{ resource: Resource.Hide, min: 0, max: 1 }, { resource: Resource.Gristle, min: 0, max: 1 }]);

        public static readonly Tyger = new UnitSpecies('Tyger', Interfaces.UnitFaction.Creature, 3, 1, [Skill.Move, Skill.Maul],
        [{ resource: Resource.Hide, min: 3, max: 4 }, { resource: Resource.Gristle, min: 3, max: 4 }]);

    public static readonly Wyrm = new UnitSpecies('Wyrm', Interfaces.UnitFaction.Creature, 1, 3, [Skill.Burrow, Skill.Burn],
        [{ resource: Resource.Petranol, min: 1, max: 3, chance: 0.75 }, { resource: Resource.Gristle, min: 1, max: 2, chance: 0.75 }]);

    public static readonly Isopod = new UnitSpecies('Isopod', Interfaces.UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Prod],
        [{ resource: Resource.Aluminite, min: 1, max: 3, chance: 0.75 }, { resource: Resource.Hide, min: 2, max: 4, chance: 0.75 }], [Status.Armored]);

    private constructor(public name: string, public faction: Interfaces.UnitFaction, public health: number,
        public actionsPerTurn: number, public skills: Skill[], public drops: ResourceDrop[], public statuses: Status[] = []) {}

    get buildCost(): ResourceInventory {
        return ResourceInventory.fromAmounts(this.drops.map(item => { return { resource: item.resource, amount: item.max }; }));
    }

    public instantiate(): Unit {
        return new Unit(this.name, this.faction, this.health, this.actionsPerTurn, this.skills, this.drops, this.statuses);
    }

}