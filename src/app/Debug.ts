import { Game } from './Game';
import { ResourceInventory } from './classes/Resource';
import { UnitSpecies } from './classes/UnitSpecies';
import { Objects } from './util/Objects';

export namespace Debug {

    // give player infinite resources
    export function eliminateScarcity(): void {
        Game.getInventoryState().addResourceInventory(ResourceInventory.fromAmount(Infinity));
    }

    // give player infinite credits
    export function receiveMassiveInheritance(): void {
        Game.getInventoryState().addCredits(Infinity);
    }

    // give player every schematic
    export function inventEverything(): void {
        const keys = Objects.safeKeys(UnitSpecies);
        for (const key of keys) {
            if (UnitSpecies[key] instanceof UnitSpecies) {
                Game.getInventoryState().addSchematic(UnitSpecies[key]);
            }
        }
    }

    // explore every biome
    export function mapTheWorld(): void {
        const mapState = Game.getMapState();
        for (let biome of mapState.biomes) {
            mapState.exploreRegion(biome, 100);
        }
    }

    // give infinite build actions
    export function hundredAndFourDays(): void {
        Game.getCombatState().buildActions = Infinity;
    }

}