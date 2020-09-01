import { Component, OnInit, Input } from '@angular/core';
import { BattlefieldRegion } from '../classes/BattlefieldRegion';

@Component({
  selector: 'app-battlefield-region',
  templateUrl: './battlefield-region.component.html',
  host: {
    '[class.targetable]': 'targetable'
  },
  styleUrls: ['./battlefield-region.component.css']
})
export class BattlefieldRegionComponent implements OnInit {

  @Input() region: BattlefieldRegion;
  @Input() targetable: boolean

  constructor() { }

  ngOnInit(): void {
  }

}
