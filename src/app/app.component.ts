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

    creditsActive(): boolean {
        return Game.creditsActive();
    }

    showCredits(): void {
        Game.setCreditsActive(true);
    }

    hideCredits(): void {
        Game.setCreditsActive(false);
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

    mapTheWorld(): void {
        Debug.mapTheWorld();
    }

    titleActive(): boolean {
        return Game.titleActive();
    }

    noteActive(): boolean {
        return Game.noteActive();
    }

    activeNote() {
        return Game.activeNote();
    }

}
