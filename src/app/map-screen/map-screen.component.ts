import { Component, OnInit } from '@angular/core';
import { Biome } from '../classes/MapTile';
import { Game } from '../Game';
import { City } from '../classes/City';
import { BiomeProgressInfo } from '../state-trackers/MapState';

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
        return Game.getMapState().citiesAvailableIn(this.playerLocation());
    }

    playerLocation(): Biome {
        return Game.getMapState().playerLocation;
    }

    moveTank(biome: Biome): void {
        return Game.getMapState().moveTank(biome);
    }

    progress(biome: Biome): BiomeProgressInfo {
        return Game.getMapState().getProgress(biome);
    }

    bossFightAvailable(biome: Biome): boolean {
        return Game.getMapState().bossFightAvailable(biome);
    }

    enterCombat(boss: boolean = false): void {
        Game.enterBiome(Game.getMapState().playerLocation, boss);
    }

    enterCity(city: City): void {
        Game.enterCity(city);
    }

}
