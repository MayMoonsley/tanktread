import { Biome } from '../classes/MapTile';
import { City } from '../classes/City';
import { Random } from '../util/Random';
import { Numbers } from '../util/Numbers';

export type BiomeProgressInfo = {
    percentExplored: number,
    bossBeaten: boolean
}

export class MapState {

    public biomes: Biome[];
    private _location: Biome;
    public city?: City;
    public progress: Record<string, BiomeProgressInfo>;

    public constructor(progress?: Record<string, BiomeProgressInfo>) {
        this.biomes = [
            Biome.Ocean,
            Biome.Forest,
            Biome.Mountain,
            Biome.Desert
        ];
        this._location = Biome.Desert;
        if (progress !== undefined) {
            this.progress = progress;
        } else {
            let temp: Record<string, BiomeProgressInfo> = {};
            for (let biome of this.biomes) {
                temp[biome.name] = {
                    percentExplored: 0,
                    bossBeaten: false
                };
            }
            this.progress = temp;
        }
    }

    get playerLocation(): Biome {
        return this._location;
    }

    public getProgress(biome: Biome): BiomeProgressInfo {
        return this.progress[biome.name];
    }

    public exploreRegion(biome: Biome, amount: number): void {
        this.progress[biome.name].percentExplored = Math.min(100,
            this.progress[biome.name].percentExplored + amount);
    }

    public moveTank(biome: Biome): void {
        this._location = biome;
    }

}