import { Component, isDevMode } from '@angular/core';
import { Debug } from './Debug';

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
        Debug.eliminateScarcity();
    }

    inventEverything(): void {
        Debug.inventEverything();
    }

    receiveMassiveInheritance(): void {
        Debug.receiveMassiveInheritance();
    }

}
