import { Component, OnInit } from '@angular/core';
import { Battlefield } from '../interfaces/Battlefield';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {

  battlefield: Battlefield = {regions: [
    {
      name: 'Swamp',
      units: [{name: 'Temp1', health: 10, maxHealth: 10}]
    },
    {
      name: 'Plains',
      units: [{name: 'Temp2', health: 10, maxHealth: 10}]
    },
    {
      name: 'Mountain',
      units: [{name: 'Temp3', health: 10, maxHealth: 10}]
    },
    {
      name: 'Island',
      units: [{name: 'Temp4', health: 10, maxHealth: 10}]
    },
    {
      name: 'Forest',
      units: [{name: 'Temp5', health: 10, maxHealth: 10}]
    }
  ]};

  constructor() { }

  ngOnInit(): void {
  }

}
