import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../classes/Unit';
import { Game } from '../Game';

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    host: {
        '[class.targetable]': 'targetable',
        '(click)': 'target($event)'
    },
    styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

    @Input() unit?: Unit = undefined;
    @Input() targetable: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    target(event: MouseEvent): void {
        if (this.targetable && this.unit !== undefined) {
            event.stopPropagation();
            Game.target(this.unit);
        }
    }

}
