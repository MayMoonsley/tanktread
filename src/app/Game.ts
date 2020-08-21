import { Battlefield } from './interfaces/Battlefield';
import { Unit } from './interfaces/Unit';
import { TurnCount } from './interfaces/TurnCount';

export namespace Game {

    var battlefield: Battlefield;

    function initBattlefield(): void {
        const regionNames = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
        battlefield = {regions: []};
        let tempNum: number = 1;
        for (let name of regionNames) {
            const units: Unit[] = [];
            for (let i = 0; i < 3; i++) {
                units.push({name: `Temp${tempNum}`, health: 10, maxHealth: 10});
                tempNum++;
            }
            battlefield.regions.push({name, units});
        }
    }

    export function getBattlefield(): Battlefield {
        if (battlefield === undefined) {
            initBattlefield();
        }
        return battlefield;
    }

    export function getTurnCount(): TurnCount {
        return {halfTurns: 3, fullTurns: 3};
    }

    export function hurtEveryone(): void {
        const b: Battlefield = getBattlefield();
        for (let region of b.regions) {
            for (let unit of region.units) {
                unit.health--;
            }
        }
    }

}