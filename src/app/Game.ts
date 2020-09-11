import { Battlefield } from './classes/Battlefield';
import { InventoryState } from './state-trackers/InventoryState';
import { CombatState } from './state-trackers/CombatState';
import { Unit } from './classes/Unit';
import { BattlefieldRegion } from './classes/BattlefieldRegion';
import { Random } from './util/Random';
import { Generators } from './util/Generators';
import { Skill, SkillTargetingMode } from './classes/Skill';
import { Targetable } from './interfaces/Targetable';
import { Status } from './classes/Status';
import { Resource } from './classes/Resource';

interface TargetingState {
    active: boolean;
    user?: Unit;
    skill?: Skill;
    targetables: Targetable[];
}

export namespace Game {

    let currentTargetingState: TargetingState = {
        active: false,
        user: undefined,
        skill: undefined,
        targetables: []
    };
    let currentCombatState: CombatState;
    let currentInventory: InventoryState = new InventoryState();

    function init(): void {
        const regionNames = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
        const tank = new Unit('Tank', Infinity, 1, [Skill.Move]);
        const battlefield = new Battlefield([]);
        let tempNum = 1;
        for (const name of regionNames) {
            const region = new BattlefieldRegion(name);
            for (let i = 0; i < 3; i++) {
                region.addUnit(new Unit(`Temp${tempNum}`, 2, 2, [Skill.Move, Skill.Prod], [{resource: Resource.Aluminite, min: 2, max: 5}]));
                tempNum++;
            }
            battlefield.regions.push(region);
        }
        battlefield.regions = Random.shuffle(battlefield.regions);
        battlefield.regions[0].addUnit(tank);
        currentCombatState = new CombatState(tank, battlefield);
    }

    export function getBattlefield(): Battlefield {
        return currentCombatState.battlefield;
    }

    export function getInventoryState(): InventoryState {
        return currentInventory;
    }

    export function getTargetables(): Targetable[] {
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
            targetables: currentCombatState.battlefield.getTargetables(user, skill.targetingMode)
        };
    }

    export function target(target: Targetable): void {
        if (!currentTargetingState.active || !currentTargetingState.targetables.includes(target)) {
            throw new Error('Game.target() called while not targeting, somehow');
        }
        target.applySkill(currentTargetingState.user!, currentTargetingState.skill!);
        currentTargetingState.user!.spendAction();
        currentTargetingState.active = false;
    }

    export function advanceTurn(): void {
        currentCombatState.advanceTurn();
    }

    init();

}
