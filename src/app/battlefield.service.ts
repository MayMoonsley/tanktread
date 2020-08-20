import { Injectable } from '@angular/core';
import { Battlefield } from './interfaces/Battlefield';
import { Unit } from './interfaces/Unit';

@Injectable({
  providedIn: 'root'
})
export class BattlefieldService {

  constructor() { }

  getBattlefield(): Battlefield {
    const regionNames = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
    const result: Battlefield = {regions: []};
    let tempNum: number = 1;
    for (let name of regionNames) {
      const units: Unit[] = [];
      for (let i = 0; i < 3; i++) {
        units.push({name: `Temp${tempNum}`, health: 10, maxHealth: 10});
        tempNum++;
      }
      result.regions.push({name, units});
    }
    return result;
  }

}
