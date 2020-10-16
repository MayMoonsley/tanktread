import { UnitSpecies } from './Unit';
import { BattlefieldRegion } from './BattlefieldRegion';
import { Random } from '../util/Random';
import { Battlefield } from './Battlefield';

export class Biome {

    public static readonly Desert = new Biome('Desert', '🏜️', ['Dune', 'Oasis', 'Flats'],
        [[UnitSpecies.Rat, 1]]);
    public static readonly Forest = new Biome('Forest', '🌳', ['Clearing', 'Thicket', 'Creek'],
        [[UnitSpecies.Rat, 1]]);
    public static readonly Mountain = new Biome('Mountain', '⛰️', ['Plateau', 'Peak', 'Valley'],
        [[UnitSpecies.Wyrm, 1]]);
    public static readonly Ocean = new Biome('Ocean', '🌊', ['Sandbar', 'Shallows', 'Tide Pool'],
        [[UnitSpecies.Isopod, 1]]);

    private constructor(private _name: string,
        private _symbol: string,
        private regionNames: string[],
        private species: [UnitSpecies, number][]) {};

    get name(): string {
        return this._name;
    }

    get symbol(): string {
        return this._symbol;
    }

    generateBattlefield(): Battlefield {
        const numRegions = Random.int(2, 5);
        const regions: BattlefieldRegion[] = [];
        const weightedRegions: [BattlefieldRegion, number][] = [];
        for (let i = 0; i < numRegions; i++) {
            const curr = new BattlefieldRegion(Random.fromArray(this.regionNames));
            regions.push(curr);
            weightedRegions.push([curr, i + 1]);
        }
        const numUnits = Random.int(numRegions * 2, numRegions * 3);
        for (let i = 0; i < numUnits; i++) {
            Random.weightedRandom(weightedRegions).addUnit(Random.weightedRandom(this.species).instantiate());
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