import { Component, OnInit } from '@angular/core';
import { MapTile } from '../classes/MapTile';
import { Game } from '../Game';

@Component({
    selector: 'app-map-screen',
    templateUrl: './map-screen.component.html',
    styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    tiles(): MapTile[][] {
        return Game.getMapState().tiles;
    }

    emojiRows(): string[][] {
        return Game.getMapState().symbols;
    }

    playerLocation(): MapTile {
        return Game.getMapState().playerLocation;
    }

    moveTank(dx: number, dy: number): void {
        return Game.getMapState().moveTank(dx, dy);
    }

}
