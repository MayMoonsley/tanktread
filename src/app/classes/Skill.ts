import { Unit } from './Unit';
import { Effect, applyEffect, effectToString } from './Effect';

export enum SkillTargetingMode {
    Self, // can only target the user
    UnitMelee, // can target any unit in the same region
    UnitArtillery, // can target any unit not in the same region
    UnitRanged, // can target any unit on the battlefield
    RegionMelee, // can target region user is in
    RegionArtillery, // can target regions user isn't in
    RegionRanged, // can target any region
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
