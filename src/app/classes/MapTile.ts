import { UnitSpecies } from './Unit';
import { BattlefieldRegion } from './BattlefieldRegion';
import { Random } from '../util/Random';
import { Battlefield } from './Battlefield';

export class Biome {

    public static readonly Desert = new Biome('Desert', '🏜️', ['Dune', 'Oasis', 'Flats']);
    public static readonly Forest = new Biome('Forest', '🌳', ['Clearing', 'Thicket', 'Creek']);
    public static readonly Mountain = new Biome('Mountain', '⛰️', ['Plateau', 'Peak', 'Valley']);
    public static readonly Ocean = new Biome('Ocean', '🌊', ['Sandbar', 'Shallows', 'Tide Pool']);

    private constructor(private _name: string,
        private _symbol: string,
        private regionNames: string[]) {};

    get name(): string {
        return this._name;
    }

    get symbol(): string {
        return this._symbol;
    }

    generateBattlefield(): Battlefield {
        const numRegions = Random.int(2, 5);
        const regions: BattlefieldRegion[] = [];
        for (let i = 0; i < numRegions; i++) {
            regions.push(new BattlefieldRegion(Random.fromArray(this.regionNames)));
        }
        return new Battlefield(regions);
    }

}

export class MapTile {

    public tankHere: boolean = false;

    public constructor(public biome: Biome, public cityName?: string) {};

    get symbol(): string {
        if (this.cityName !== undefined) {
            return '🏙️';
        }
        return this.biome.symbol;
    }

    get tankedSymbol(): string {
        if (this.tankHere) {
            return '🚗';
        }
        return this.symbol;
    }

    get name(): string {
        if (this.cityName !== undefined) {
            return `The City of ${this.cityName}`;
        } else {
            return this.biome.name;
        }
    }

}