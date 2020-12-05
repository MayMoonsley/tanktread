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
    public matriarchBeaten: boolean = false;

    public constructor(progress?: Record<string, BiomeProgressInfo>) {
        this.biomes = [
            Biome.Ocean,
            Biome.Forest,
            Biome.Mountain,
            Biome.Wasteland,
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

    get finalBossAvailable(): boolean {
        return !this.matriarchBeaten && Object.values(this.progress).map(progress => progress.bossBeaten).reduce((acc, x) => acc && x);
    }

    public bossFightAvailable(biome: Biome): boolean {
        const progress = this.progress[biome.name];
        return !progress.bossBeaten && progress.percentExplored >= 100;
    }

    public getProgress(biome: Biome): BiomeProgressInfo {
        if (biome === Biome.Nest) {
            return {
                percentExplored: 100,
                bossBeaten: this.matriarchBeaten
            };
        }
        return this.progress[biome.name];
    }

    public citiesAvailableIn(biome: Biome): City[] {
        return City.getCities().filter(
            city => city.location === biome
                && this.getProgress(biome).percentExplored >= city.explorationNeeded
        );
    }

    public exploreRegion(biome: Biome, amount: number): void {
        if (biome === Biome.Nest) {
            return;
        }
        this.progress[biome.name].percentExplored = Math.min(100,
            this.progress[biome.name].percentExplored + amount);
    }

    public moveTank(biome: Biome): void {
        this._location = biome;
    }

    public killBoss(biome: Biome = this._location): void {
        if (biome === Biome.Nest) {
            return;
        }
        this.progress[biome.name].bossBeaten = true;
    }

}