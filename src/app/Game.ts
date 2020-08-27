import { Battlefield } from './interfaces/Battlefield';
import { Unit } from './classes/Unit';
import { TurnCount } from './interfaces/TurnCount';
import { BattlefieldRegion } from './interfaces/BattlefieldRegion';
import { Random } from './util/Random';

export namespace Game {

    var battlefield: Battlefield;

    function init(): void {
        const regionNames = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
        battlefield = {regions: []};
        let tempNum: number = 1;
        for (let name of regionNames) {
            const units: Unit[] = [];
            for (let i = 0; i < 3; i++) {
                units.push(new Unit(`Temp${tempNum}`, 10));
                tempNum++;
            }
            battlefield.regions.push({name, units});
        }
        battlefield.regions = Random.shuffle(battlefield.regions);
    }

    export function getBattlefield(): Battlefield {
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

    export function hurtSomeone(): void {

    }

    init();

}