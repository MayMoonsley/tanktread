import { Component, OnInit, Input } from '@angular/core';
import { UnitSpecies } from '../classes/Unit';

@Component({
  selector: 'app-unit-species',
  templateUrl: './unit-species.component.html',
  styleUrls: ['./unit-species.component.css']
})
export class UnitSpeciesComponent implements OnInit {

    @Input() species: UnitSpecies = UnitSpecies.Tank;

    constructor() { }

    ngOnInit(): void {
    }

}
