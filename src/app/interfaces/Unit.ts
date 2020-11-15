import { Targetable } from './Targetable';
import { BattlefieldRegion } from '../classes/BattlefieldRegion';
import { Status } from '../classes/Status';
import { ResourceInventory } from '../classes/Resource';

export enum UnitFaction {
    Tank = '👤', Drone = '🤖', Creature = '🐛', Deposit = '🍄'
}

export interface Unit extends Targetable {

    containingRegion?: BattlefieldRegion;
    faction: UnitFaction;
    buildCost: ResourceInventory;
    statuses: Status[];
    alive: boolean;
    buildPerTurn: number;
    buildActionCost: number;

    wound(amount: number): void;

    heal(amount: number): void;

    addStatus(status: Status): void;

    removeStatus(status: Status): void;

    moveTo(region: BattlefieldRegion): void;

    die(dropItems?: boolean): void;

    addActions(amount: number): void;

}