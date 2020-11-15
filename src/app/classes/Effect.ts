import { Unit, UnitFaction } from '../interfaces/Unit';
import { BattlefieldRegion } from './BattlefieldRegion';
import { EffectPredicate, testEffectPredicate, effectPredicateToString } from './EffectPredicate';
import { Status } from './Status';
import { Types } from '../util/Types';
import { Targetable } from '../interfaces/Targetable';
import { InventoryState } from '../state-trackers/InventoryState';
import { CombatState } from '../state-trackers/CombatState';
import { AIRating, invertRating } from '../interfaces/AIRating';

type UnitFunction = (user: Unit, target: Unit, focus: 'target' | 'user', ...args: any[]) => void;
type RegionFunction = (user: Unit, target: BattlefieldRegion, focus: 'target' | 'user', ...args: any[]) => void;
type RatingFunction = (...args: any[]) => AIRating;

export class EffectType {

    private constructor(private unitFunc: UnitFunction,
        private regionFunc: RegionFunction,
        private ratingFunc: RatingFunction) {}

    private static fromUnitFunction(toUnit: UnitFunction, rating: RatingFunction): EffectType {
        const toRegion = (user: Unit, target: BattlefieldRegion, focus: 'target' | 'user', ...args: any[]): void => {
            const dummyArr: Unit[] = [...target.units];
            for (const unit of dummyArr) {
                toUnit(user, unit, focus, ...args);
            }
        };
        return new EffectType(toUnit, toRegion, rating);
    }

    private static fromRegionFunction(toRegion: RegionFunction, rating: RatingFunction): EffectType {
        const toUnit = (user: Unit, target: Unit, focus: 'target' | 'user', ...args: any[]): void => {
            if (target.containingRegion !== undefined) {
                toRegion(user, target.containingRegion, focus, ...args);
            }
        };
        return new EffectType(toUnit, toRegion, rating);
    }

    public static readonly Damage = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', damage: number) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        effectFocus.wound(damage);
    }, () => AIRating.Bad);

    public static readonly Heal = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', amount: number) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        effectFocus.heal(amount);
    }, () => AIRating.Good);

    public static readonly Status = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', status: Status) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        if (status !== Status.MindControl || !effectFocus.statuses.includes(Status.Boss)) {
            effectFocus.addStatus(status);
        }
    }, (status: Status) => status.rating);

    public static readonly RemoveStatus = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', status: Status) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        effectFocus.removeStatus(status);
    }, (status: Status) => invertRating(status.rating));

    public static readonly Kill = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user',) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        if (!effectFocus.statuses.includes(Status.Boss)) {
            effectFocus.die();
        }
    }, () => AIRating.Bad);

    public static readonly MoveTo = EffectType.fromRegionFunction((user: Unit, target: BattlefieldRegion, focus: 'target' | 'user') => {
        // TODO: how should focus work with this?
        user.moveTo(target);
    }, () => AIRating.Neutral);

    public static readonly Collect = EffectType.fromRegionFunction((user: Unit,
        target: BattlefieldRegion, focus: 'target' | 'user', inventory: InventoryState) => {
        let effectFocus: BattlefieldRegion;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user.containingRegion!;
        }
        inventory.addResourceInventory(effectFocus.collectResources());
    }, () => AIRating.Neutral);

    public static readonly Refresh = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', amount: number) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        effectFocus.addActions(amount);
    }, () => AIRating.Good);

    public static readonly Harvest = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', inventory: InventoryState, combat: CombatState) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        if (!effectFocus.statuses.includes(Status.Boss)) {
            if (effectFocus.faction === UnitFaction.Drone) {
                combat.buildActions += effectFocus.buildActionCost;
            } else {
                inventory.addResourceInventory(effectFocus.buildCost);
            }
            effectFocus.die(false);
        }
    }, () => AIRating.Good);

    public static readonly BuildActions = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', amount: number, combat: CombatState) => {
        combat.buildActions += amount;
    }, () => AIRating.Neutral);

    public applyToUnit(user: Unit, target: Unit, focus: 'target' | 'user', predicate?: EffectPredicate, otherwise?: Effect, ...args: any[]): void {
        if (predicate !== undefined && !testEffectPredicate(user, target, predicate)) {
            // TODO: this should handle inventory
            if (otherwise !== undefined) {
                applyEffect(otherwise, user, target);
            }
            return;
        }
        this.unitFunc(user, target, focus, ...args);
    }

    public applyToRegion(user: Unit, target: BattlefieldRegion, focus: 'target' | 'user', predicate?: EffectPredicate, otherwise?: Effect, ...args: any[]): void {
        this.regionFunc(user, target, focus, ...args);
    }

    public applyToTargetable(user: Unit, target: Targetable, focus: 'target' | 'user', predicate?: EffectPredicate, otherwise?: Effect, ...args: any[]): void {
        if (target instanceof BattlefieldRegion) {
            this.applyToRegion(user, target, focus, predicate, otherwise, ...args);
        } else {
            // safe unless we add more targetable things
            this.applyToUnit(user, target as Unit, focus, predicate, otherwise, ...args);
        }
    }

    public getRating(...args: any[]): AIRating {
        return this.ratingFunc(...args);
    }

}

/**
 * focus: Whether the Effect should be applied to the Unit using the skill, or the thing it's targeting.
 * type: What kind of Effect it is.
 * Effect types:
 * -Damage: deals (amount) damage to focus.
 * -Heal: heals focus for (amount) health.
 * -Status: gives focus (status).
 * -Kill: kills focus
 * -MoveTo: moves user to focus
 * -Collect: collect resources at focus
 * -Harvest: kills focus + gives player its build cost
 * -Refresh: regain (amount) actions
 * -BuildActions: gain (amount) buildactions
 */

export type Effect = {focus: 'target' | 'user'; predicate?: EffectPredicate; otherwise?: Effect} & ({type: 'Damage'; amount: number;}
| {type: 'Heal'; amount: number;}
| {type: 'Status'; status: Status;}
| {type: 'RemoveStatus'; status: Status;}
| {type: 'Kill';}
| {type: 'MoveTo';}
| {type: 'Collect';}
| {type: 'Harvest';}
| {type: 'Refresh'; amount: number;}
| {type: 'BuildActions'; amount: number});

export function applyEffect(effect: Effect, user: Unit, target: Targetable, inventory?: InventoryState, combat?: CombatState): void {
    switch (effect.type) {
    case 'Damage':
        EffectType.Damage.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise, effect.amount);
        return;
    case 'Heal':
        EffectType.Heal.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise, effect.amount);
        return;
    case 'Status':
        EffectType.Status.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise, effect.status);
        return;
    case 'RemoveStatus':
        EffectType.Status.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise, effect.status);
        return;
    case 'Kill':
        EffectType.Kill.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise);
        return;
    case 'MoveTo':
        EffectType.MoveTo.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise);
        return;
    case 'Collect':
        EffectType.Collect.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise, inventory);
        return;
    case 'Harvest':
        EffectType.Harvest.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise, inventory, combat);
        return;
    case 'Refresh':
        EffectType.Refresh.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise, effect.amount);
        return;
    case 'BuildActions':
        EffectType.BuildActions.applyToTargetable(user, target, effect.focus, effect.predicate, effect.otherwise, effect.amount, combat);
        return;
    default:
        return Types.impossible(effect);
    }
}

function subEffectToString(effect: Effect): string {
    switch (effect.type) {
    case 'Damage':
        return `Deal ${effect.amount} damage to ${effect.focus}.`;
    case 'Heal':
        return `Heal ${effect.focus} for ${effect.amount}.`;
    case 'Status':
        return `Give ${effect.focus} ${effect.status.emoji} ${effect.status.name}.`;
    case 'RemoveStatus':
        return `Remove ${effect.status.emoji} ${effect.status.name} from ${effect.focus}.`;
    case 'Kill':
        return `Kill ${effect.focus}.`;
    case 'MoveTo':
        return `Move to ${effect.focus}.`;
    case 'Collect':
        return `Collect resources at ${effect.focus}.`;
    case 'Harvest':
        return `Harvest ${effect.focus}.`;
    case 'Refresh':
        return `Increase ${effect.focus}'s actions by ${effect.amount}.`;
    case 'BuildActions':
        return `Gain ${effect.amount}⚙️.`;
    }
}

function getSubEffectRating(effect: Effect): AIRating {
    switch (effect.type) {
        case 'Damage':
            return EffectType.Damage.getRating(effect.amount);
        case 'Heal':
            return EffectType.Heal.getRating(effect.amount);
        case 'Status':
            return EffectType.Status.getRating(effect.status);
        case 'RemoveStatus':
            return EffectType.RemoveStatus.getRating(effect.status);
        case 'Kill':
            return EffectType.Kill.getRating();
        case 'MoveTo':
            return EffectType.MoveTo.getRating();
        case 'Collect':
            return EffectType.Collect.getRating();
        case 'Harvest':
            return EffectType.Harvest.getRating();
        case 'Refresh':
            return EffectType.Refresh.getRating();
        case 'BuildActions':
            return EffectType.BuildActions.getRating();
        default:
            return Types.impossible(effect);
        }
}

export function getEffectRating(effect: Effect): {'user': AIRating, 'target': AIRating} {
    const r = {
        user: AIRating.Neutral,
        target: AIRating.Neutral
    };
    r[effect.focus] = getSubEffectRating(effect);
    return r;
}

export function effectToString(effect: Effect): string {
    if (effect.predicate !== undefined) {
        if (effect.otherwise !== undefined) {
            return `If ${effectPredicateToString(effect.predicate)}: ${subEffectToString(effect)}`;
        } else {
            return `If ${effectPredicateToString(effect.predicate)}: ${subEffectToString(effect)}`;
        }
    } else {
        return subEffectToString(effect);
    }
}