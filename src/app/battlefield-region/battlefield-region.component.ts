import { Component, OnInit, Input } from '@angular/core';
import { BattlefieldRegion } from '../classes/BattlefieldRegion';
import { Game } from '../Game';
import { Unit } from '../classes/Unit';

@Component({
  selector: 'app-battlefield-region',
  templateUrl: './battlefield-region.component.html',
  host: {
    '[class.targetable]': 'targetable'
  },
  styleUrls: ['./battlefield-region.component.css']
})
export class BattlefieldRegionComponent implements OnInit {

  @Input() region?: BattlefieldRegion;
  @Input() targetable: boolean = false;

  isTargetable(unit: Unit): boolean {
    return Game.getTargetables().includes(unit);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
