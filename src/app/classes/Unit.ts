import * as Interfaces from '../interfaces/Unit';

export class Unit implements Interfaces.Unit {

    name: string;
    health: number;
    maxHealth: number;

    constructor(name: string, health: number) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
    }

}