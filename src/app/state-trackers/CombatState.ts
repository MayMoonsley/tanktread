import { Battlefield } from '../classes/Battlefield';
import { applyEffect } from '../classes/Effect';
import { Skill } from '../classes/Skill';
import { Status } from '../classes/Status';
import { Unit } from '../classes/Unit';
import { AIRating, multiplyRatings } from '../interfaces/AIRating';
import { Targetable } from '../interfaces/Targetable';
import { UnitFaction } from '../interfaces/Unit';
import { Random } from '../util/Random';
import { InventoryState } from './InventoryState';
import { MapState } from './MapState';

export type AIAction = {
    user: Unit,
    skill: Skill,
    target: Targetable
}

export class CombatState {

    private _bossFight: boolean;
    private boss?: Unit;

    constructor(public tank: Unit, public battlefield: Battlefield, private mapState: MapState, public isEnemyTurn: boolean = false, bossFight?: boolean, boss?: Unit) {
        if (bossFight !== undefined) {
            this._bossFight = bossFight;
        } else {
            const bossArr = battlefield.getAllUnits().filter(unit => unit.statuses.includes(Status.Boss));
            this._bossFight = bossArr.length > 0;
            if (this._bossFight) {
                this.boss = bossArr[0];
            }
        }
    }

    get isBossFight(): boolean {
        return this._bossFight;
    }

    advanceTurn(): void {
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
        user.removeStatus(Status.Pheromones);
        if (this.boss !== undefined && !this.boss.alive) {
            this.mapState.killBoss();
        }
    }

    //TODO: There are some issues with this.
    // - Skills that can target more things are more likely to be used.
    *calculateEnemyActions(): Generator<AIAction, void, void> {
        // units who've done all they can (prevents errors)
        let doneActors: Unit[] = [];
        while (true) {
            // continue this process until all enemy units have acted (or are dead, i guess)
            const enemyActors = this.battlefield.getEnemyActors().filter(actor => !doneActors.includes(actor));
            if (enemyActors.length === 0) {
                return;
            }
            // choose a random unit
            const actor: Unit = Random.fromArray(enemyActors);
            const goodActions: AIAction[] = [];
            const neutralActions: AIAction[] = [];
            const badActions: AIAction[] = [];
            for (let skill of actor.skills) {
                let targets = this.battlefield.getTargetables(actor, skill.targetingMode);
                for (let target of targets) {
                    const action = {
                        user: actor,
                        target: target,
                        skill: skill
                    };
                    switch (multiplyRatings(skill.rating.target, target.rating)) {
                        case AIRating.Good:
                            goodActions.push(action);
                            break;
                        case AIRating.Neutral:
                            neutralActions.push(action);
                            break;
                        case AIRating.Bad:
                            badActions.push(action);
                            break;
                    }
                }
            }
            if (goodActions.length > 0) {
                yield Random.fromArray(goodActions);
            } else if (neutralActions.length > 0) {
                yield Random.fromArray(neutralActions);
            } else {
                doneActors.push(actor);
            }
        }
    }

    canRetreat(): boolean {
        return this.tank.containingRegion === this.battlefield.regions[0];
    }

    canPackUp(): boolean {
        return this.battlefield.getAllUnitsOfFaction(UnitFaction.Creature).length === 0;
    }

}