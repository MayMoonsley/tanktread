import { Effect, effectToString } from './Effect';
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
    public static readonly Move = new Skill('Move', SkillTargetingMode.RegionAdjacent, [{ type: 'MoveTo', focus: 'target' }]);
    public static readonly Burrow = new Skill('Burrow', SkillTargetingMode.RegionRanged, [{ type: 'MoveTo', focus: 'target' }]);

    // Utility Skills
    public static readonly Collect = new Skill('Collect', SkillTargetingMode.RegionMelee, [{ type: 'Collect', focus: 'user' }]);
    public static readonly Deconstruct = new Skill('Deconstruct', SkillTargetingMode.UnitMelee, [{type: 'Harvest', focus: 'target'}]);

    // Basic Attacks
    public static readonly Sting = new Skill('Sting', SkillTargetingMode.UnitMelee, [{ type: 'Damage', focus: 'target', amount: 1 }, { type: 'Kill', focus: 'user' }]);
    public static readonly Prod = new Skill('Prod', SkillTargetingMode.UnitMelee, [{ type: 'Damage', focus: 'target', amount: 1 }]);

    // Fire Skills
    public static readonly Burn = new Skill('Burn', SkillTargetingMode.UnitMelee, [{ type: 'Status', focus: 'target', status: Status.Fire }]);
    public static readonly Detonate = new Skill('Detonate', SkillTargetingMode.UnitMelee, [{ type: 'Kill', focus: 'target' }, { type: 'Kill', focus: 'user' }]);

    // Mind Control Skills
    public static readonly Hypnotize = new Skill('Hypnotize', SkillTargetingMode.UnitMelee,
        [{ type: 'Status', focus: 'target', status: Status.MindControl }, { type: 'Kill', focus: 'user' }]);

    private constructor(name: string, targetingMode: SkillTargetingMode, effects: Effect[]) {
        this.name = name;
        this.targetingMode = targetingMode;
        this.effects = effects;
    }

    get description(): string {
        return this.effects.map(effectToString).join('\n');
    }

}
