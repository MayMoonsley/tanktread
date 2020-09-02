import { BattlefieldRegion } from './BattlefieldRegion';
import { Skill } from './Skill';

export class Unit {

    name: string;
    health: number;
    maxHealth: number;
    skills: Skill[];
    containingRegion?: BattlefieldRegion = undefined;

    constructor(name: string, health: number, skills: Skill[] = []) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.skills = skills;
    }

    wound(x: number): void {
        this.health -= x;
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

}
