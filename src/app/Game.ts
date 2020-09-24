import { Battlefield } from './classes/Battlefield';
import { GameState } from './state-trackers/GameState';
import { InventoryState } from './state-trackers/InventoryState';
import { CombatState } from './state-trackers/CombatState';
import { Unit, UnitSpecies } from './classes/Unit';
import { BattlefieldRegion } from './classes/BattlefieldRegion';
import { Objects } from './util/Objects';
import { Random } from './util/Random';
import { Skill } from './classes/Skill';
import { Targetable } from './interfaces/Targetable';
import { ResourceInventory } from './classes/Resource';

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

    function initialCombatState(): CombatState {
        const regionNames = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
        const tank = UnitSpecies.Tank.instantiate();
        const enemySpecies = [UnitSpecies.Rat, UnitSpecies.Wyrm];
        const battlefield = new Battlefield([]);
        for (const name of regionNames) {
            const region = new BattlefieldRegion(name);
            for (let i = 0; i < 1; i++) {
                region.addUnit(Random.fromArray(enemySpecies).instantiate());
            }
            battlefield.regions.push(region);
        }
        battlefield.regions = Random.shuffle(battlefield.regions);
        battlefield.regions[0].addUnit(tank);
        return new CombatState(tank, battlefield);
    }

    const currentState = new GameState(initialCombatState(), new InventoryState());

    export function getBattlefield(): Battlefield {
        return currentState.combat.battlefield;
    }

    export function getInventoryState(): InventoryState {
        return currentState.inventory;
    }

    export function getCombatState(): CombatState {
        return currentState.combat;
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
            targetables: currentState.combat.battlefield.getTargetables(user, skill.targetingMode)
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
        currentState.combat.advanceTurn();
    }

    export function build(species: UnitSpecies): void {
        console.log(`Building ${species.name}`);
        const region = currentState.combat.tank.containingRegion;
        if (region !== undefined) {
            region.addUnit(species.instantiate());
            currentState.inventory.removeResourceInventory(species.buildCost);
            currentState.combat.tank.spendAction();
        }
    }

}
