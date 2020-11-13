import { Component, OnInit } from '@angular/core';
import { Game } from '../Game';

@Component({
    selector: 'app-title-screen',
    templateUrl: './title-screen.component.html',
    styleUrls: ['./title-screen.component.css']
})
export class TitleScreenComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    enterGame(): void {
        Game.newGame();
        Game.setTitleActive(false);
    }

}
