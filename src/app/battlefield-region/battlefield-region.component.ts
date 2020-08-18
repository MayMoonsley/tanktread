import { Component, OnInit, Input } from '@angular/core';
import { BattlefieldRegion } from '../interfaces/BattlefieldRegion';

@Component({
  selector: 'app-battlefield-region',
  templateUrl: './battlefield-region.component.html',
  styleUrls: ['./battlefield-region.component.css']
})
export class BattlefieldRegionComponent implements OnInit {

  @Input() region: BattlefieldRegion;

  constructor() { }

  ngOnInit(): void {
  }

}
