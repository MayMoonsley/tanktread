import { Unit } from './Unit';
import { Effect, applyEffect, effectToString } from './Effect';

export enum SkillTargetingMode {
    Self, UnitMelee, UnitRanged, Region
}

export class Skill {

    name: string;
    targetingMode: SkillTargetingMode;
    effects: Effect[];

    constructor(name: string, targetingMode: SkillTargetingMode, effects: Effect[]) {
        this.name = name;
        this.targetingMode = targetingMode;
        this.effects = effects;
    }

    get description(): string {
        return this.effects.map(effectToString).join('\n');
    }

    applyEffects(user: Unit, target: Unit): void {
        for (const effect of this.effects) {
            applyEffect(effect, user, target);
        }
    }

}
