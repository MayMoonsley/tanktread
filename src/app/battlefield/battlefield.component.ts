import { Component, OnInit } from '@angular/core';
import { Battlefield } from '../classes/Battlefield';
import { BattlefieldRegion } from '../classes/BattlefieldRegion';
import { Game } from '../Game';
import { Targetable } from '../interfaces/Targetable';

@Component({
    selector: 'app-battlefield',
    templateUrl: './battlefield.component.html',
    styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {

  battlefield?: Battlefield;
  targetables?: Targetable[];

  constructor() {}

  ngOnInit(): void {
      this.battlefield = Game.getBattlefield();
      this.targetables = Game.getTargetables();
  }

  isTargetable(region: BattlefieldRegion): boolean {
      return Game.getTargetables().includes(region);
  }

}
