import { Targetable } from './Targetable';
import { BattlefieldRegion } from '../classes/BattlefieldRegion';
import { Status } from '../classes/Status';

export interface Unit extends Targetable {

    containingRegion?: BattlefieldRegion;

    wound(amount: number): void;

    heal(amount: number): void;

    addStatus(status: Status): void;

    moveTo(region: BattlefieldRegion): void;

    die(): void;

}