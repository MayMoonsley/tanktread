import { Injectable } from '@angular/core';
import { Battlefield } from './classes/Battlefield';
import { BattlefieldRegion } from './classes/BattlefieldRegion';
import { Unit } from './classes/Unit';
import { Game } from './Game';

@Injectable({
    providedIn: 'root'
})
export class BattlefieldService {

    constructor() { }

    getBattlefield(): Battlefield {
        return Game.getBattlefield();
    }

    getTargetables(): (Unit | BattlefieldRegion)[] {
        return Game.getTargetables();
    }

}
