import { UnitSpecies } from './Unit';
import { BattlefieldRegion } from './BattlefieldRegion';
import { Random } from '../util/Random';
import { Battlefield } from './Battlefield';
import { City } from './City';

export class Biome {

    public static readonly Desert = new Biome('Desert', '🏜️', ['Dune', 'Oasis', 'Flats'],
        [[UnitSpecies.Crab, 3], [UnitSpecies.Lobster, 1]]);
    public static readonly Forest = new Biome('Forest', '🌳', ['Clearing', 'Thicket', 'Creek'],
        [[UnitSpecies.Rat, 3], [UnitSpecies.Tyger, 1]]);
    public static readonly Mountain = new Biome('Mountain', '⛰️', ['Plateau', 'Peak', 'Valley'],
        [[UnitSpecies.Wyrm, 3], [UnitSpecies.Drake, 1]]);
    public static readonly Ocean = new Biome('Ocean', '🌊', ['Sandbar', 'Shallows', 'Tide Pool'],
        [[UnitSpecies.Isopod, 3], [UnitSpecies.Barracuda, 1]]);

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
        const numRegions = Random.int(3, 6);
        const regions: BattlefieldRegion[] = [];
        const weightedRegions: [BattlefieldRegion, number][] = [];
        for (let i = 0; i < numRegions; i++) {
            const curr = new BattlefieldRegion(Random.fromArray(this.regionNames));
            regions.push(curr);
            weightedRegions.push([curr, i + 1]);
        }
        const numUnits = Random.int(numRegions, numRegions * 2);
        for (let i = 0; i < numUnits; i++) {
            Random.weightedRandom(weightedRegions).addUnit(Random.weightedRandom(this.species).instantiate());
        }
        return new Battlefield(regions);
    }

}

export class MapTile {

    public tankHere: boolean = false;

    public constructor(public biome: Biome, public city?: City) {};

    get symbol(): string {
        if (this.city !== undefined) {
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
        if (this.city !== undefined) {
            return `The City of ${this.city.name}`;
        } else {
            return this.biome.name;
        }
    }

}