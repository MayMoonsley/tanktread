import { Component, OnInit } from '@angular/core';
import { Unit } from '../Unit'

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  unit: Unit = {
    name: 'TEMP',
    health: 10,
    maxHealth: 10
  };

  constructor() { }

  ngOnInit(): void {
  }

}
