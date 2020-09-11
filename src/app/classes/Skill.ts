import { Unit } from './Unit';
import { Effect, applyEffect, effectToString } from './Effect';
import { Status } from './Status';

export enum SkillTargetingMode {
    Self, // can only target the user
    UnitMelee, // can target any unit in the same region
    UnitArtillery, // can target any unit not in the same region
    UnitRanged, // can target any unit on the battlefield
    RegionMelee, // can target region user is in
    RegionAdjacent, // can target regions next to the user
    RegionArtillery, // can target regions user isn't in
    RegionRanged, // can target any region
}

export class Skill {

    name: string;
    targetingMode: SkillTargetingMode;
    effects: Effect[];

    // Movement Skills
    public static readonly Move = new Skill('Move', SkillTargetingMode.RegionAdjacent, [{type: 'moveTo'}]);
    public static readonly Burrow = new Skill('Burrow', SkillTargetingMode.RegionRanged, [{type: 'moveTo'}]);

    // Utility Skills
    public static readonly Collect = new Skill('Collect', SkillTargetingMode.RegionMelee, [{type: 'collect'}]);

    // Basic Attacks
    public static readonly Prod = new Skill('Prod', SkillTargetingMode.UnitMelee, [{type: 'damageTarget', amount: 1}]);

    // Fire Skills
    public static readonly Burn = new Skill('Burning', SkillTargetingMode.UnitMelee, [{type: 'statusTarget', status: Status.Fire}]);

    private constructor(name: string, targetingMode: SkillTargetingMode, effects: Effect[]) {
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
