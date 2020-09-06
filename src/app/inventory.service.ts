import { Injectable } from '@angular/core';
import { InventoryState } from './state-trackers/InventoryState';
import { Game } from './Game';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    constructor() { }

    getInventory(): InventoryState {
        return Game.getInventoryState();
    }

}
