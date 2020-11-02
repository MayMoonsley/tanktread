import { CombatState } from './CombatState';
import { InventoryState } from './InventoryState';
import { MapState } from './MapState';

export enum GameMode {
    Map = 'map', Town = 'town', Battle = 'battle'
}

export class GameState {

    public creditsActive: boolean = false;

    constructor(public mode: GameMode, public combat: CombatState, public inventory: InventoryState, public map: MapState) {};

}