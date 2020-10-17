import { Component, OnInit } from '@angular/core';
import { Game } from '../Game';

@Component({
    selector: 'app-combat-screen',
    templateUrl: './combat-screen.component.html',
    styleUrls: ['./combat-screen.component.css']
})
export class CombatScreenComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    advanceTurn(): void {
        Game.advanceTurn();
    }

    retreat(): void {
        Game.returnToMap();
    }

    canRetreat(): boolean {
        return Game.getCombatState().canRetreat();
    }

}
