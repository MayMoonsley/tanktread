import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../classes/Skill';
import { Unit } from '../classes/Unit';
import { Game } from '../Game';

@Component({
    selector: 'app-skill',
    templateUrl: './skill.component.html',
    host: {
        '[class.currentlyUsing]': 'currentlyUsing()'
    },
    styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

    @Input() skill?: Skill;
    @Input() unit?: Unit;
    @Input() canBeUsed: boolean = false;
    @Input() playerControlled: boolean = false;
    description: String[];

    constructor() {
        this.description = [];
    }

    ngOnInit(): void {
        if (this.skill !== undefined) {
            this.description = this.skill.description.split('\n');
        } else {
            this.description = [];
        }
    }

    use(event: MouseEvent): void {
        event.stopPropagation();
        Game.beginTargeting(this.unit!, this.skill!);
    }

    currentlyUsing(): boolean {
        return Game.isCurrentlyUsing(this.unit!, this.skill!);
    }

    cancel(): void {
        Game.cancelTargeting();
    }

    disabled(): boolean {
        const usable = this.canBeUsed && !Game.isEnemyTurn() && this.unit!.canAct() && this.skill!.canBeUsedBy(this.unit!);
        return !usable;
    }

}
