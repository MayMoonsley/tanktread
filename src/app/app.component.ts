import { Component, isDevMode } from '@angular/core';
import { Debug } from './Debug';
import { Game } from './Game';
import { GameMode } from './state-trackers/GameState';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'tanktread';

    debugMode(): boolean {
        return isDevMode();
    }

    gameMode(): GameMode {
        return Game.getMode();
    }

    eliminateScarcity(): void {
        Debug.eliminateScarcity();
    }

    inventEverything(): void {
        Debug.inventEverything();
    }

    receiveMassiveInheritance(): void {
        Debug.receiveMassiveInheritance();
    }

}
