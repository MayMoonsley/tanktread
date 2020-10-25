import { BattlefieldRegion } from './BattlefieldRegion';
import { Skill } from './Skill';
import { Status } from './Status';
import { Arrays } from '../util/Arrays';
import { ResourceDrop, resourceDropToAmount, ResourceInventory, Resource } from './Resource';
import * as Interfaces from '../interfaces/Unit';
import { AIRating } from '../interfaces/AIRating';

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

    get rating(): AIRating {
        if (this.statuses.includes(Status.Pheromones)) {
            return AIRating.Good;
        } else if (this.faction === Interfaces.UnitFaction.Deposit) {
            return AIRating.Neutral;
        }
        return this.playerControlled ? AIRating.Bad : AIRating.Good;
    }

    wound(x: number, piercing: boolean = false, ignoreCorrosion: boolean = false): void {
        if (this.statuses.includes(Status.Armored) && !piercing) {
            x = Math.max(0, x - 1);
        }
        if (this.statuses.includes(Status.Corroded) && !ignoreCorrosion) {
            x += 1;
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
        if (this.faction === Interfaces.UnitFaction.Deposit) {
            return false;
        }
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
            this.wound(1, true, true);
        }
    }

}

export class UnitSpecies {

    // The Tank
    public static readonly Tank = new UnitSpecies('Tank', Interfaces.UnitFaction.Tank, Infinity, 2,
        [Skill.Move, Skill.Collect, Skill.Deconstruct], []);

    // Drones
    public static readonly Stinger = new UnitSpecies('Stinger', Interfaces.UnitFaction.Drone, 1, 2, [Skill.Move, Skill.Sting, Skill.Collect], []);

    public static readonly Firebomb = new UnitSpecies('Firebomb', Interfaces.UnitFaction.Drone,
        1, 2, [Skill.Move, Skill.Detonate], [{ resource: Resource.Petranol, min: 1, max: 3, chance: 0 }]);

    public static readonly Controller = new UnitSpecies('Controller', Interfaces.UnitFaction.Drone,
        1, 2, [Skill.Move, Skill.Hypnotize], [{ resource: Resource.Cordylith, min: 1, max: 1, chance: 0 }]);

    public static readonly Mister = new UnitSpecies('Mister', Interfaces.UnitFaction.Drone, 1, 2,
        [Skill.Move, Skill.Mist], [{resource: Resource.Nodule, min: 2, max: 2, chance: 0}, {resource: Resource.Gristle, min: 2, max: 2, chance: 0}]);

    public static readonly Gardener = new UnitSpecies('Gardener', Interfaces.UnitFaction.Drone, 4, 1,
        [Skill.Move, Skill.Prune], [{ resource: Resource.Aluminite, min: 1, max: 3, chance: 0 }, {resource: Resource.Nodule, min: 1, max: 1, chance: 0}]);

    public static readonly Debug = new UnitSpecies('Troubleshooter', Interfaces.UnitFaction.Drone, Infinity, Infinity, [Skill.Move,
        Skill.Decapitate, Skill.Meteor], []);

    // Creatures

    // Kill-Combo Series
    public static readonly Rat = new UnitSpecies('Rat', Interfaces.UnitFaction.Creature, 1, 1, [Skill.Move, Skill.Gnaw],
        [{ resource: Resource.Hide, min: 0, max: 1 }, { resource: Resource.Gristle, min: 0, max: 1 }]);

    public static readonly Tyger = new UnitSpecies('Tyger', Interfaces.UnitFaction.Creature, 3, 1, [Skill.Move, Skill.Maul],
        [{ resource: Resource.Hide, min: 3, max: 4 }, { resource: Resource.Gristle, min: 3, max: 4 }]);

    // Fire Series
    public static readonly Wyrm = new UnitSpecies('Wyrm', Interfaces.UnitFaction.Creature, 1, 3, [Skill.Burrow, Skill.Burn],
        [{ resource: Resource.Petranol, min: 1, max: 3, chance: 0.75 }, { resource: Resource.Gristle, min: 1, max: 2, chance: 0.75 }]);

    public static readonly Drake = new UnitSpecies('Drake', Interfaces.UnitFaction.Creature, 3, 3, [Skill.FlamingWings, Skill.Burn],
        [{ resource: Resource.Petranol, min: 4, max: 6, chance: 0.75 }, { resource: Resource.Gristle, min: 3, max: 5, chance: 0.75 }, { resource: Resource.Cordylith, min: 0, max: 1, chance: 0.01}])

    // Armor Series
    public static readonly Isopod = new UnitSpecies('Isopod', Interfaces.UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Prod],
        [{ resource: Resource.Aluminite, min: 1, max: 3, chance: 0.75 }, { resource: Resource.Hide, min: 2, max: 4, chance: 0.75 }], [Status.Armored]);

    public static readonly Barracuda = new UnitSpecies('Barracuda', Interfaces.UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Slash],
        [{ resource: Resource.Aluminite, min: 4, max: 5, chance: 0.75 }, { resource: Resource.Hide, min: 4, max: 6, chance: 0.75 }], [Status.Armored]);

    // Corrosion Series
    public static readonly Crab = new UnitSpecies('Crab', Interfaces.UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Corrode], [{ resource: Resource.Nodule, min: 0, max: 1, chance: 0.2 }, {resource: Resource.Silicate, min: 1, max: 2, chance: 0.75}]);

    public static readonly Lobster = new UnitSpecies('Lobster', Interfaces.UnitFaction.Creature, 2, 1, [Skill.Move, Skill.PhlegmaticShriek], [{ resource: Resource.Nodule, min: 0, max: 2, chance: 0.3 }, {resource: Resource.Silicate, min: 3, max: 5, chance: 0.75}]);

    // Deposits
    public static Clutch = UnitSpecies.createDepositSpecies('Clutch', 4, [{resource: Resource.Nodule, min: 3, max: 5}]);
    public static Well = UnitSpecies.createDepositSpecies('Well', 3, [{resource: Resource.Petranol, min: 2, max: 4}]);
    public static Coral = UnitSpecies.createDepositSpecies('Coral', 5, [{resource: Resource.Silicate, min: 2, max: 4}, {resource: Resource.Aluminite, min: 1, max: 3}], [Status.Armored]);
    public static Spire = UnitSpecies.createDepositSpecies('Spire', 6, [{resource: Resource.Cordylith, min: 2, max: 4}]);

    private constructor(public name: string, public faction: Interfaces.UnitFaction, public health: number,
        public actionsPerTurn: number, public skills: Skill[], public drops: ResourceDrop[], public statuses: Status[] = []) {}

    private static createDepositSpecies(name: string, health: number, drops: ResourceDrop[], statuses: Status[] = []): UnitSpecies {
        return new UnitSpecies(name, Interfaces.UnitFaction.Deposit, health, 0, [], drops, statuses);
    }

    get buildCost(): ResourceInventory {
        return ResourceInventory.fromAmounts(this.drops.map(item => { return { resource: item.resource, amount: item.max }; }));
    }

    public instantiate(): Unit {
        return new Unit(this.name, this.faction, this.health, this.actionsPerTurn, this.skills, this.drops, this.statuses);
    }

}