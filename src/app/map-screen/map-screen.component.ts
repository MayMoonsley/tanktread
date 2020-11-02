import { Component, OnInit } from '@angular/core';
import { MapTile, Biome } from '../classes/MapTile';
import { Game } from '../Game';
import { City } from '../classes/City';

@Component({
    selector: 'app-map-screen',
    templateUrl: './map-screen.component.html',
    styleUrls: ['./map-screen.component.css']
})
export class MapScreenComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    biomes(): Biome[] {
        return Game.getMapState().biomes;
    }

    cities(): City[] {
        return City.getCities().filter(city => city.location === this.playerLocation())
    }

    tiles(): MapTile[][] {
        return Game.getMapState().tiles;
    }

    emojiRows(): string[][] {
        return Game.getMapState().symbols;
    }

    playerLocation(): Biome {
        return Game.getMapState().playerLocation;
    }

    moveTank(biome: Biome): void {
        return Game.getMapState().moveTank(biome);
    }

    enterCombat(): void {
        Game.enterBiome(Game.getMapState().playerLocation);
    }

    enterCity(city: City): void {
        Game.enterCity(city);
    }

}
