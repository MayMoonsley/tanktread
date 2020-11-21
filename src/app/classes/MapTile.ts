// TODO: This file needs to be renamed, since map tiles are defunct

import { UnitSpecies } from './UnitSpecies';
import { BattlefieldRegion } from './BattlefieldRegion';
import { Random } from '../util/Random';
import { Battlefield } from './Battlefield';
import { City } from './City';

export class Biome {

    public static readonly Desert = new Biome('Desert', ['Dune', 'Oasis', 'Flats'],
        [[UnitSpecies.Crab, 2], [UnitSpecies.Lobster, 1]],
        [[UnitSpecies.Well, 1]],
        UnitSpecies.Friday);
    public static readonly Forest = new Biome('Forest', ['Clearing', 'Thicket', 'Creek'],
        [[UnitSpecies.Rat, 2], [UnitSpecies.Tyger, 1]],
        [[UnitSpecies.Clutch, 1]],
        UnitSpecies.Charleston);
    public static readonly Mountain = new Biome('Mountain', ['Plateau', 'Peak', 'Valley'],
        [[UnitSpecies.Wyrm, 2], [UnitSpecies.Drake, 1]],
        [[UnitSpecies.Spire, 1]],
        UnitSpecies.Ember);
    public static readonly Ocean = new Biome('Ocean', ['Sandbar', 'Shallows', 'Tide Pool'],
        [[UnitSpecies.Isopod, 2], [UnitSpecies.Barracuda, 1]],
        [[UnitSpecies.Coral, 1]],
        UnitSpecies.Mint);
    public static readonly Wasteland = new Biome('Wasteland', ['Ruins', 'Tarmac', 'Sewers'],
        [[UnitSpecies.Anemone, 1], [UnitSpecies.Vermin, 1]],
        [[UnitSpecies.Lodestone, 1]],
        UnitSpecies.Magic);
    public static readonly Nest = new Biome('Nest', ['Marsh', 'Swamp', 'Wetland'],
        [],
        [],
        UnitSpecies.Matriarch);

    private constructor(private _name: string,
        private regionNames: string[],
        private species: [UnitSpecies, number][],
        private deposits: [UnitSpecies, number][],
        private boss: UnitSpecies) {};

    get name(): string {
        return this._name;
    }

    generateBattlefield(boss: boolean = false): Battlefield {
        const numRegions = boss ? 3 : Random.int(3, 6);
        const regions: BattlefieldRegion[] = [];
        const weightedRegions: [BattlefieldRegion, number][] = [];
        for (let i = 0; i < numRegions; i++) {
            const curr = new BattlefieldRegion(Random.fromArray(this.regionNames));
            regions.push(curr);
            weightedRegions.push([curr, i + 1]);
        }
        if (boss) {
            regions[regions.length - 1].addUnit(this.boss.instantiate());
        }
        const numUnits = boss ? 4 : Random.int(numRegions, numRegions * 2);
        if (this.species.length > 0) {
            for (let i = 0; i < numUnits; i++) {
                Random.weightedRandom(weightedRegions).addUnit(Random.weightedRandom(this.species).instantiate());
            }
        }
        if (this.deposits.length > 0) {
            const numDeposits = Random.int(numRegions * 0.5, numRegions * 1);
            for (let i = 0; i < numDeposits; i++) {
                Random.fromArray(regions).addUnit(Random.weightedRandom(this.deposits).instantiate());
            }
        }
        return new Battlefield(regions);
    }

}