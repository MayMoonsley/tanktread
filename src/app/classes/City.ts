import { Resource } from './Resource';
import { Objects } from '../util/Objects';
import { UnitSpecies } from './UnitSpecies';
import { Biome } from './MapTile';

export class City {

    public static readonly FlowerHeights = new City('Flower Heights',
        'Pruning a World in Bloom', Biome.Forest, 0,
        [[UnitSpecies.Mister, 30], [UnitSpecies.Gardener, 50], [UnitSpecies.Mulcher, 60]]);
    public static readonly Iivi = new City('iivi', 'Resonance Without Limit',
        Biome.Mountain, 0, [[UnitSpecies.Controller, 100]]);
    public static readonly Solarium = new City('Solarium',
        'For the Love of Light', Biome.Desert, 0,
        [[UnitSpecies.Firebomb, 10], [UnitSpecies.Igniter, 25], [UnitSpecies.Firefighter, 50]]);
    public static readonly MilleniumHall = new City('Millenium Hall',
        'To One Thousand Years of Progress', Biome.Ocean, 0,
        [[UnitSpecies.Lifter, 25], [UnitSpecies.Protector, 60]]);
    public static readonly HuskGarage = new City('Husk Garage',
        'Repair and Breathe', Biome.Wasteland, 0,
        [[UnitSpecies.Battery, 25], [UnitSpecies.Dynamo, 50], [UnitSpecies.Gearhead, 60], [UnitSpecies.Salvager, 75], [UnitSpecies.MiniFactory, 125]]);

    static getCities(): City[] {
        return [
            City.FlowerHeights,
            City.Iivi,
            City.Solarium, City.HuskGarage,
            City.MilleniumHall];
    }

    private constructor(public name: string, public motto: string,
        public location: Biome, public explorationNeeded: number,
        public schematics: [UnitSpecies, number][] = [],
        private priceMultipliers: Record<string, number> = {}) {};

    getPriceMultiplier(resource: Resource): number {
        const key = Objects.multitonKey(Resource, resource);
        const value = this.priceMultipliers[key];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (value !== undefined) {
            return value;
        }
        return 1;
    }

    getBuyPrice(resource: Resource): number {
        return resource.value * this.getPriceMultiplier(resource);
    }

    getSellPrice(resource: Resource): number {
        return this.getBuyPrice(resource) * 2;
    }

}