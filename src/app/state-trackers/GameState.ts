import { CombatState } from './CombatState';
import { InventoryState } from './InventoryState';
import { MapState } from './MapState';

export class GameState {

    constructor(public combat: CombatState, public inventory: InventoryState, public map: MapState) {}

}