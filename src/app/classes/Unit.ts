import { BattlefieldRegion } from './BattlefieldRegion';
import { Skill } from './Skill';
import { Status } from './Status';
import { Targetable } from '../interfaces/Targetable';
import { Arrays } from '../util/Arrays';
import { ResourceDrop, resourceDropToAmount, ResourceInventory, Resource } from './Resource';

export enum UnitFaction {
    Tank = '👤', Drone = '🤖', Creature = '🐛'
}

export class Unit implements Targetable {

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
    faction: UnitFaction;

    constructor(name: string, faction: UnitFaction, health: number, actionsPerTurn: number, skills: Skill[] = [], drops: ResourceDrop[] = []) {
        this.name = name;
        this.faction = faction;
        this.health = health;
        this.maxHealth = health;
        this.skills = skills;
        this.statuses = [];
        this.drops = drops;
        this.actionsPerTurn = actionsPerTurn;
        this.actionsLeft = actionsPerTurn;
    }

    get playerControlled(): boolean {
        return this.faction === UnitFaction.Drone || this.faction === UnitFaction.Tank;
    }

    get buildCost(): ResourceInventory {
        return new ResourceInventory(this.drops.map(item => { return { resource: item.resource, amount: item.max }; }));
    }

    wound(x: number): void {
        this.health -= x;
        if (this.health <= 0) {
            this.die();
        }
    }

    die(): void {
        if (!this.alive) {
            return;
        }
        if (this.health === Infinity) {
            return;
        }
        if (this.containingRegion !== undefined) {
            for (const drop of this.drops) {
                this.containingRegion.addResource(drop.resource, resourceDropToAmount(drop));
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

    applySkill(user: Unit, skill: Skill): void {
        skill.applyEffects(user, this);
    }

    canAct(): boolean {
        return this.actionsLeft > 0 || this.statuses.includes(Status.Advantage);
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
            this.wound(1);
        }
    }

}

export class UnitSpecies {

    // The Tank
    public static readonly Tank = new UnitSpecies('Tank', UnitFaction.Tank, Infinity, 2, [Skill.Move, Skill.Collect], []);

    // Drones
    public static readonly Stinger = new UnitSpecies('Stinger', UnitFaction.Drone, 1, 2, [Skill.Move, Skill.Sting, Skill.Collect], []);

    public static readonly Detonator = new UnitSpecies('Detonator', UnitFaction.Drone,
        1, 2, [Skill.Move, Skill.Detonate], [{ resource: Resource.Petranol, min: 1, max: 3 }]);

    // Creatures
    public static readonly Rat = new UnitSpecies('Rat', UnitFaction.Creature,
        1, 1, [Skill.Move, Skill.Prod], [{ resource: Resource.Hide, min: 1, max: 2 }]);

    public static readonly Wyrm = new UnitSpecies('Wyrm', UnitFaction.Creature,
        1, 3, [Skill.Burrow, Skill.Burn], [{ resource: Resource.Petranol, min: 3, max: 4 }]);

    private constructor(public name: string, public faction: UnitFaction, public health: number,
        public actionsPerTurn: number, public skills: Skill[], public drops: ResourceDrop[]) {}

    get buildCost(): ResourceInventory {
        return new ResourceInventory(this.drops.map(item => { return { resource: item.resource, amount: item.max }; }));
    }

    public instantiate(): Unit {
        return new Unit(this.name, this.faction, this.health, this.actionsPerTurn, this.skills, this.drops);
    }

}