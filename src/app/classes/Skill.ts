import { Effect, effectToString, getEffectRating } from './Effect';
import { Status } from './Status';
import { UnitFaction } from '../interfaces/Unit';
import { AIRating, combineRatings } from '../interfaces/AIRating';
import { Unit } from './Unit';

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
    private _rating: {target: AIRating, user: AIRating};

    // Movement Skills
    public static readonly Move = new Skill('Move', SkillTargetingMode.RegionAdjacent, [{ type: 'MoveTo', focus: 'target' }]);
    public static readonly Burrow = new Skill('Burrow', SkillTargetingMode.RegionRanged, [{ type: 'MoveTo', focus: 'target' }]);
    public static readonly FlamingWings = new Skill('Flaming Wings', SkillTargetingMode.RegionRanged, [{type: 'Status', status: Status.Fire, focus: 'target'}, { type: 'MoveTo', focus: 'target' }]);

    // Utility Skills
    public static readonly Collect = new Skill('Collect', SkillTargetingMode.RegionMelee, [{ type: 'Collect', focus: 'user' }]);
    public static readonly Deconstruct = new Skill('Deconstruct', SkillTargetingMode.UnitMelee, [{ type: 'Harvest', focus: 'target', predicate: { type: 'IsFaction', faction: UnitFaction.Drone, focus: 'target' } }]);
    public static readonly Prune = new Skill('Prune', SkillTargetingMode.UnitMelee, [{ type: 'Harvest', focus: 'target', predicate: { type: 'IsFaction', faction: UnitFaction.Deposit, focus: 'target' } }]);

    // Basic Attacks
    public static readonly Sting = new Skill('Sting', SkillTargetingMode.UnitMelee, [{ type: 'Damage', focus: 'target', amount: 1 }, { type: 'Kill', focus: 'user' }]);
    public static readonly Prod = new Skill('Prod', SkillTargetingMode.UnitMelee, [{ type: 'Damage', focus: 'target', amount: 1 }]);
    public static readonly Slash = new Skill('Slash', SkillTargetingMode.UnitMelee, [{ type: 'Damage', focus: 'target', amount: 2 }]);

    // Kill-Combo Attacks
    public static readonly Gnaw = new Skill('Gnaw', SkillTargetingMode.UnitMelee, [{ type: 'Damage', focus: 'target', amount: 1 },
        { type: 'Refresh', focus: 'user', amount: 1, predicate: {type: 'IsDead', focus: 'target'} }]);
    public static readonly Maul = new Skill('Maul', SkillTargetingMode.UnitMelee, [{ type: 'Damage', focus: 'target', amount: 2 },
        { type: 'Refresh', focus: 'user', amount: 1, predicate: {type: 'IsDead', focus: 'target'} }]);

    // Charged Skills
    public static readonly Siphon = new Skill('Siphon', SkillTargetingMode.UnitMelee, [{ type: 'Damage', focus: 'target', amount: 2 },
        { type: 'Status', focus: 'user', status: Status.Charged, predicate: {type: 'IsDead', focus: 'target'} }]);

    public static readonly Arc = new Skill('Arc', SkillTargetingMode.UnitArtillery,
        [{type: 'Status', status: Status.Charged, focus: 'target', predicate: {type: 'IsFaction', faction: UnitFaction.Drone, focus: 'target'}, otherwise: {type: 'Damage', focus: 'target', amount: 3}}, {type: 'RemoveStatus', status: Status.Charged, focus: 'user'}], true);

    // Fire Skills
    public static readonly Burn = new Skill('Burn', SkillTargetingMode.UnitMelee, [{ type: 'Status', focus: 'target', status: Status.Fire }]);
    public static readonly Detonate = new Skill('Detonate', SkillTargetingMode.UnitMelee, [{ type: 'Status', status: Status.Fire, focus: 'target' }, { type: 'Kill', focus: 'user' }]);
    public static readonly Bite = new Skill('Bite', SkillTargetingMode.UnitMelee, [{ type: 'Damage', focus: 'target', amount: 1 },
        { type: 'Refresh', focus: 'user', amount: 1, predicate: {type: 'HasStatus', focus: 'target', status: Status.Fire} }]);

    // Corrosion Skills
    public static readonly Corrode = new Skill('Corrode', SkillTargetingMode.UnitMelee, [{type: 'Status', focus: 'target', status: Status.Corroded}]);
    public static readonly Pinch = new Skill('Pinch', SkillTargetingMode.UnitMelee, [{type: 'Damage', focus: 'target', amount: 1}, {type: 'Damage', focus: 'target', amount: 3, predicate: {type: 'HasStatus', focus: 'target', status: Status.Corroded}}]);
    public static readonly PhlegmaticShriek = new Skill('Phlegmatic Shriek', SkillTargetingMode.RegionAdjacent, [{type: 'Status', focus: 'target', status: Status.Corroded}]);

    // Mind Control Skills
    public static readonly Hypnotize = new Skill('Hypnotize', SkillTargetingMode.UnitMelee,
        [{ type: 'Status', focus: 'target', status: Status.MindControl }, { type: 'Kill', focus: 'user' }]);

    // Pheromones Skills
    public static readonly Mist = new Skill('Mist', SkillTargetingMode.UnitMelee,
        [{ type: 'Status', focus: 'target', status: Status.Pheromones }, { type: 'Kill', focus: 'user' }]);

    // Debug Skills
    public static readonly Decapitate = new Skill('Decapitate', SkillTargetingMode.UnitMelee,
        [{type: 'Kill', focus: 'target'}]);

    public static readonly Meteor = new Skill('Meteor', SkillTargetingMode.RegionRanged,
        [{type: 'Kill', focus: 'target'}]);

    private constructor(name: string, targetingMode: SkillTargetingMode, effects: Effect[], public readonly requiresCharge: boolean = false) {
        this.name = name;
        this.targetingMode = targetingMode;
        this.effects = effects;
        const effectRatings = this.effects.map(effect => getEffectRating(effect));
        this._rating = {
            target: combineRatings(...effectRatings.map(rating => rating.target)),
            user: combineRatings(...effectRatings.map(rating => rating.user))
        };
    }

    get description(): string {
        let r: string[] = [];
        if (this.requiresCharge) {
            r.push('Requires 🔋 Charged.');
        }
        if (this.effects.length === 0) {
            r.push('Do nothing.');
        } else {
            r = r.concat(this.effects.map(effectToString));
        }
        return r.join('\n');
    }

    get rating(): {'user': AIRating, 'target': AIRating} {
        return this._rating;
    }

    public canBeUsedBy(unit: Unit): boolean {
        return !this.requiresCharge || unit.statuses.includes(Status.Charged);
    }

}
