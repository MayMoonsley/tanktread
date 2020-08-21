import { Injectable } from '@angular/core';
import { Game } from './Game';
import { TurnCount } from './interfaces/TurnCount';

@Injectable({
  providedIn: 'root'
})
export class CombatStateService {

  constructor() { }

  getTurnCount(): TurnCount {
    return Game.getTurnCount();
  }

}
