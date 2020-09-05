import { BattlefieldRegion } from './BattlefieldRegion';
import { Skill } from './Skill';
import { Status } from './Status';
import { Targetable } from '../interfaces/Targetable';
import { Arrays } from '../util/Arrays';
import { ResourceDrop, resourceDropToAmount } from './Resource';

export class Unit implements Targetable {

    name: string;
    health: number;
    maxHealth: number;
    skills: Skill[];
    statuses: Status[];
    drops: ResourceDrop[];
    containingRegion?: BattlefieldRegion = undefined;
    actedThisTurn: boolean;

    constructor(name: string, health: number, skills: Skill[] = [], drops: ResourceDrop[] = []) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.skills = skills;
        this.statuses = [];
        this.drops = drops;
        this.actedThisTurn = false;
    }

    wound(x: number): void {
        this.health -= x;
        if (this.health <= 0) {
            this.die();
        }
    }

    die(): void {
        if (this.containingRegion !== undefined) {
            for (let drop of this.drops) {
                this.containingRegion.addResource(drop.resource, resourceDropToAmount(drop));
            }
            this.containingRegion.removeUnit(this);
        }
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
        console.log(this.actedThisTurn);
        return !this.actedThisTurn;
    }

    addStatus(status: Status): void {
        this.statuses = Arrays.addWithoutDuplicate(status, this.statuses);
    }

    removeStatus(status: Status): void {
        this.statuses = Arrays.removeFrom(status, this.statuses);
    }

    advanceTurn(): void {
        this.actedThisTurn = false;
        if (this.statuses.includes(Status.Fire)) {
            this.wound(1);
        }
    }

}
