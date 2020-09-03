import { Component, OnInit } from '@angular/core';
import { Battlefield } from '../classes/Battlefield';
import { BattlefieldRegion } from '../classes/BattlefieldRegion';
import { BattlefieldService } from '../battlefield.service';
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

  constructor(private battlefieldService: BattlefieldService) {}

  ngOnInit(): void {
      this.battlefield = this.battlefieldService.getBattlefield();
      this.targetables = this.battlefieldService.getTargetables();
  }

  isTargetable(region: BattlefieldRegion): boolean {
      return Game.getTargetables().includes(region);
  }

}
