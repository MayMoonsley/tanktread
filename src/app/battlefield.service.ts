import { Injectable } from '@angular/core';
import { Battlefield } from './classes/Battlefield';
import { Game } from './Game';

@Injectable({
  providedIn: 'root'
})
export class BattlefieldService {

  constructor() { }

  getBattlefield(): Battlefield {
    return Game.getBattlefield();
  }

}
