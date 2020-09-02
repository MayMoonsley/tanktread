import { Battlefield } from './classes/Battlefield';
import { Unit } from './classes/Unit';
import { BattlefieldRegion } from './classes/BattlefieldRegion';
import { Random } from './util/Random';
import { Skill, SkillTargetingMode } from './classes/Skill';

interface TargetingState {
    active: boolean,
    user?: Unit,
    skill?: Skill,
    targetables: (Unit | BattlefieldRegion)[]
}

export namespace Game {

    let battlefield: Battlefield;
    let currentTargetingState: TargetingState = {
        active: false,
        user: undefined,
        skill: undefined,
        targetables: []
    };

    function init(): void {
        const regionNames = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
        const skills = [new Skill('Bash', SkillTargetingMode.Self, [{type: 'damageTarget', amount: 2}])];
        battlefield = new Battlefield([]);
        let tempNum = 1;
        for (const name of regionNames) {
            const region = new BattlefieldRegion(name);
            for (let i = 0; i < 3; i++) {
                region.addUnit(new Unit(`Temp${tempNum}`, 10, [Random.fromArray(skills)]));
                tempNum++;
            }
            battlefield.regions.push(region);
        }
        battlefield.regions = Random.shuffle(battlefield.regions);
    }

    export function getBattlefield(): Battlefield {
        return battlefield;
    }

    export function getTargetables(): (Unit | BattlefieldRegion)[] {
        if (currentTargetingState.active) {
            return currentTargetingState.targetables;
        }
        return [];
    }

    export function beginTargeting(user: Unit, skill: Skill): void {
        currentTargetingState = {
            active: true,
            user,
            skill,
            targetables: battlefield.getTargetables(user, skill.targetingMode)
        }
    }

    export function hurtEveryone(): void {
        const b: Battlefield = getBattlefield();
        for (const region of b.regions) {
            for (const unit of region.units) {
                unit.health--;
            }
        }
    }

    export function hurtSomeone(): void {
        const region = Random.fromArray(battlefield.regions);
        const unit = Random.fromArray(region.units);
        unit.health--;
    }

    init();

}
