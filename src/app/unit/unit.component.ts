import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../classes/Unit';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  host: {
    '[class.targetable]': 'targetable'
  },
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  @Input() unit: Unit;
  @Input() targetable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
