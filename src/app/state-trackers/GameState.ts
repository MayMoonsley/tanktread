import { CombatState } from './CombatState';
import { InventoryState } from './InventoryState';

export class GameState {

    constructor(public combat: CombatState, public inventory: InventoryState) {}

}