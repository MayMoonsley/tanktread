import { Injectable } from '@angular/core';
import { Game } from './Game';
import { Battlefield } from './classes/Battlefield';
import { Targetable } from './interfaces/Targetable';
import { CombatState } from './state-trackers/CombatState';


@Injectable({
  providedIn: 'root'
})
export class CombatStateService {

    constructor() { }

    getBattlefield(): Battlefield {
        return Game.getBattlefield();
    }

    getCombatState(): CombatState {
        return Game.getCombatState();
    }

    getTargetables(): Targetable[] {
        return Game.getTargetables();
    }

}
