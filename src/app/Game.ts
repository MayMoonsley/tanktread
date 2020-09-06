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
        const skills = Generators.shuffleCycle([
            new Skill('Thwack', SkillTargetingMode.UnitMelee, [{ type: 'damageTarget', amount: 3 }]),
            new Skill('Snipe', SkillTargetingMode.UnitRanged, [{ type: 'damageTarget', amount: 1 }]),
            new Skill('Comfort', SkillTargetingMode.UnitMelee, [{ type: 'healTarget', amount: 2 }]),
            new Skill('Blanket', SkillTargetingMode.RegionRanged, [{type: 'damageTarget', amount: 2}]),
            new Skill('Flying Tackle', SkillTargetingMode.UnitArtillery, [{type: 'damageTarget', amount: 1}, {type: 'moveTo'}]),
            new Skill('Incinerate', SkillTargetingMode.UnitMelee, [{type: 'statusTarget', status: Status.Fire}]),
            new Skill('Collect', SkillTargetingMode.Self, [{type: 'collect'}])
        ]);
        const battlefield = new Battlefield([]);
        let tempNum = 1;
        for (const name of regionNames) {
            const region = new BattlefieldRegion(name);
            for (let i = 0; i < 3; i++) {
                region.addUnit(new Unit(`Temp${tempNum}`, 2, [skills.next().value], [{resource: Resource.Aluminite, min: 2, max: 5}]));
                tempNum++;
            }
            battlefield.regions.push(region);
        }
        battlefield.regions = Random.shuffle(battlefield.regions);
        currentCombatState = new CombatState(battlefield);
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
        currentTargetingState.user!.actedThisTurn = true;
        currentTargetingState.active = false;
    }

    export function advanceTurn(): void {
        currentCombatState.advanceTurn();
    }

    init();

}
