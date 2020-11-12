import { BattlefieldRegion } from './BattlefieldRegion';
import { Skill } from './Skill';
import { Status } from './Status';
import { Arrays } from '../util/Arrays';
import { ResourceDrop, resourceDropToAmount, ResourceInventory, Resource } from './Resource';
import * as Interfaces from '../interfaces/Unit';
import { AIRating } from '../interfaces/AIRating';
import { Random } from '../util/Random';

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
            // this pushes so it doesn't run into issues with Slippery
            this.statuses.push(status);
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
        if (!piercing && this.statuses.includes(Status.Shield) && x > 0) {
            this.removeStatus(Status.Shield);
            return;
        }
        this.health -= x;
        if (x > 0 && this.statuses.includes(Status.Piezoelectric)) {
            this.addStatus(Status.Charged);
        }
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
        if (this.statuses.includes(Status.Undying)) {
            this.health = this.maxHealth;
            this.removeStatus(Status.Undying);
            return;
        }
        if (this.containingRegion !== undefined) {
            if (dropItems) {
                for (const drop of this.drops) {
                    this.containingRegion.addResource(drop.resource, resourceDropToAmount(drop));
                }
                if (this.faction === Interfaces.UnitFaction.Creature && Random.boolean(this.maxHealth / 255)) {
                    this.containingRegion.addResource(Resource.Scale, 1);
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
        if (this.statuses.includes(Status.Slippery)) {
            return;
        }
        this.statuses = Arrays.addWithoutDuplicate(status, this.statuses);
    }

    removeStatus(status: Status): void {
        this.statuses = Arrays.removeFrom(status, this.statuses);
    }

    advanceTurn(): void {
        if (this.statuses.includes(Status.Stunned)) {
            this.removeStatus(Status.Stunned);
        } else {
            this.actionsLeft = this.actionsPerTurn;
        }
        if (this.statuses.includes(Status.Fire)) {
            this.wound(1, true, true);
        }
    }

}
