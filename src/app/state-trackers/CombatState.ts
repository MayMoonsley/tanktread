import { Battlefield } from '../classes/Battlefield';
import { applyEffect } from '../classes/Effect';
import { Skill } from '../classes/Skill';
import { Unit } from '../classes/Unit';
import { AIRating, multiplyRatings } from '../interfaces/AIRating';
import { Targetable } from '../interfaces/Targetable';
import { UnitFaction } from '../interfaces/Unit';
import { Random } from '../util/Random';
import { InventoryState } from './InventoryState';

export type AIAction = {
    user: Unit,
    skill: Skill,
    target: Targetable
}

export class CombatState {

    constructor(public tank: Unit, public battlefield: Battlefield) {}

    advanceTurn(): void {
        // TODO: this shouldn't be done instantly; skills should be conveyed properly
        // perform enemy actions
        const actionGenerator = this.calculateEnemyActions();
        for (let action of actionGenerator) {
            this.applyAction(action);
        }
        // and now the turn's really over, so...
        for (const unit of this.battlefield.getAllUnits()) {
            unit.advanceTurn();
        }
    }

    applyAction(action: AIAction): void {
        this.useSkill(action.user, action.skill, action.target);
    }

    useSkill(user: Unit, skill: Skill, target: Targetable, inventory: InventoryState = new InventoryState()): void {
        for (const effect of skill.effects) {
            applyEffect(effect, user, target, inventory);
        }
        user.spendAction();
    }

    //TODO: There are some issues with this.
    // - Skills that can target more things are more likely to be used.
    *calculateEnemyActions(): Generator<AIAction, void, void> {
        while (true) {
            // continue this process until all enemy units have acted (or are dead, i guess)
            const enemyActors = this.battlefield.getEnemyActors();
            if (enemyActors.length === 0) {
                return;
            }
            // choose a random unit
            const actor: Unit = Random.fromArray(enemyActors);
            const possibleActions: AIAction[] = [];
            for (let skill of actor.skills) {
                let targets = this.battlefield.getTargetables(actor, skill.targetingMode);
                if (skill.rating.target !== AIRating.Neutral) {
                    // only choose sensible target combinations (i.e., only do Bad things to Bad units, etc.)
                    targets = targets.filter(target => multiplyRatings(target.rating, skill.rating.target) === AIRating.Good);
                }
                for (let target of targets) {
                    possibleActions.push({
                        user: actor,
                        skill: skill,
                        target: target
                    });
                }
            }
            yield Random.fromArray(possibleActions);
        }
    }

    canRetreat(): boolean {
        return this.tank.containingRegion === this.battlefield.regions[0];
    }

    canPackUp(): boolean {
        return this.battlefield.getAllUnitsOfFaction(UnitFaction.Creature).length === 0;
    }

}