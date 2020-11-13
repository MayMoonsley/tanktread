import { CombatState } from './CombatState';
import { InventoryState } from './InventoryState';
import { MapState } from './MapState';
import { Note } from '../classes/Note';

export enum GameMode {
    Map = 'map', Town = 'town', Battle = 'battle'
}

export class GameState {

    public creditsActive: boolean = false;
    public titleActive: boolean = true;
    public activeNote?: Note = Note.Welcome;

    constructor(public mode: GameMode, public combat: CombatState, public inventory: InventoryState, public map: MapState) {};

}