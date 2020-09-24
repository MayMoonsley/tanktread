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
    statusEmoji: string[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        if (this.unit !== undefined) {
            this.statusEmoji = this.unit.statuses.map(status => status.emoji);
        }
    }

    target(event: MouseEvent): void {
        if (this.targetable && this.unit !== undefined) {
            event.stopPropagation();
            Game.target(this.unit);
        }
    }

}
