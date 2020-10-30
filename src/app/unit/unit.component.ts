import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../classes/Unit';
import { Game } from '../Game';

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    host: {
        '[class.targetable]': 'targetable',
        '[class.targeted]': 'beingTargeted()',
        '(click)': 'target($event)'
    },
    styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

    @Input() unit?: Unit = undefined;
    @Input() targetable: boolean = false;
    @Input() showHeader: boolean = true;
    statusEmoji: string[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        if (this.unit !== undefined) {
            this.statusEmoji = this.unit.statuses.map(status => status.emoji);
        }
    }

    formattedName(): string {
        if (this.unit !== undefined) {
            return this.unit.formattedName;
        }
        return 'Undefined Unit';
    }

    target(event: MouseEvent): void {
        if (this.targetable && this.unit !== undefined) {
            event.stopPropagation();
            Game.target(this.unit);
        }
    }

    beingTargeted(): boolean {
        return Game.isCurrentlyBeingTargeted(this.unit!);
    }

}
