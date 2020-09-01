import { Injectable } from '@angular/core';
import { Battlefield } from './classes/Battlefield';
import { BattlefieldRegion } from './classes/BattlefieldRegion';
import { Unit } from './classes/Unit';
import { Game } from './Game';
import { Targetable } from './interfaces/Targetable';

@Injectable({
  providedIn: 'root'
})
export class BattlefieldService {

  constructor() { }

  getBattlefield(): Battlefield {
    return Game.getBattlefield();
  }

  getTargetables(): Targetable[] {
    return Game.getTargetables();
  }

}
