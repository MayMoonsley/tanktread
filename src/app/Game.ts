import { Battlefield } from './classes/Battlefield';
import { InventoryState } from './state-trackers/InventoryState';
import { CombatState } from './state-trackers/CombatState';
import { Unit, UnitSpecies } from './classes/Unit';
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
    const currentInventory: InventoryState = new InventoryState();

    function init(): void {
        const regionNames = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
        const tank = UnitSpecies.Tank.instantiate();
        const enemySpecies = [UnitSpecies.Rat, UnitSpecies.Wyrm];
        const battlefield = new Battlefield([]);
        let tempNum = 1;
        for (const name of regionNames) {
            const region = new BattlefieldRegion(name);
            for (let i = 0; i < 1; i++) {
                region.addUnit(Random.fromArray(enemySpecies).instantiate());
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

    export function build(species: UnitSpecies): void {
        console.log(`Building ${species.name}`);
        const region = currentCombatState.tank.containingRegion;
        if (region !== undefined) {
            region.addUnit(species.instantiate());
        }
        currentInventory.removeResourceInventory(species.buildCost);
    }

    init();

}
