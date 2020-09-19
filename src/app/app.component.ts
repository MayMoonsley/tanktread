import { Component, isDevMode } from '@angular/core';
import { Game } from './Game';

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

    eliminateScarcity(): void {
        Game.Debug.eliminateScarcity();
    }

    inventEverything(): void {
        Game.Debug.inventEverything();
    }

    receiveMassiveInheritance(): void {
        Game.Debug.receiveMassiveInheritance();
    }

}
