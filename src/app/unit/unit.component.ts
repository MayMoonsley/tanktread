import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../classes/Unit';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  @Input() unit: Unit;

  constructor() { }

  ngOnInit(): void {
  }

}
