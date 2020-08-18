import { Component, OnInit } from '@angular/core';
import { Unit } from '../Unit';

@Component({
  selector: 'app-battlefield-region',
  templateUrl: './battlefield-region.component.html',
  styleUrls: ['./battlefield-region.component.css']
})
export class BattlefieldRegionComponent implements OnInit {

  units: Unit[] = [
    {name: 'Temp1', health: 10, maxHealth: 10},
    {name: 'Temp2', health: 10, maxHealth: 10},
    {name: 'Temp3', health: 10, maxHealth: 10},
    {name: 'Temp4', health: 10, maxHealth: 10}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
