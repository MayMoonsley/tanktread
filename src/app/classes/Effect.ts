import { Unit } from '../interfaces/Unit';
import { BattlefieldRegion } from './BattlefieldRegion';
import { EffectPredicate, testEffectPredicate, effectPredicateToString } from './EffectPredicate';
import { Status } from './Status';
import { Types } from '../util/Types';
import { Targetable } from '../interfaces/Targetable';
import { InventoryState } from '../state-trackers/InventoryState';

export class EffectType {

    private constructor(private unitFunc: (user: Unit, target: Unit, focus: 'target' | 'user', ...args: any[]) => void,
        private regionFunc: (user: Unit, target: BattlefieldRegion, focus: 'target' | 'user', ...args: any[]) => void) {}

    private static fromUnitFunction(toUnit: (user: Unit, target: Unit, focus: 'target' | 'user', ...args: any[]) => void): EffectType {
        const toRegion = (user: Unit, target: BattlefieldRegion, focus: 'target' | 'user', ...args: any[]): void => {
            const dummyArr: Unit[] = [...target.units];
            for (const unit of dummyArr) {
                toUnit(user, unit, focus, ...args);
            }
        };
        return new EffectType(toUnit, toRegion);
    }

    private static fromRegionFunction(toRegion: (user: Unit, target: BattlefieldRegion, focus: 'target' | 'user', ...args: any[]) => void): EffectType {
        const toUnit = (user: Unit, target: Unit, focus: 'target' | 'user', ...args: any[]): void => {
            if (target.containingRegion !== undefined) {
                toRegion(user, target.containingRegion, focus, ...args);
            }
        };
        return new EffectType(toUnit, toRegion);
    }

    public static readonly Damage = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', damage: number) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        effectFocus.wound(damage);
    });

    public static readonly Heal = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', amount: number) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        effectFocus.heal(amount);
    });

    public static readonly Status = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', status: Status) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        effectFocus.addStatus(status);
    });

    public static readonly Kill = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user',) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        effectFocus.die();
    });

    public static readonly MoveTo = EffectType.fromRegionFunction((user: Unit, target: BattlefieldRegion, focus: 'target' | 'user') => {
        // TODO: how should focus work with this?
        user.moveTo(target);
    });

    public static readonly Collect = EffectType.fromRegionFunction((user: Unit,
        target: BattlefieldRegion, focus: 'target' | 'user', inventory: InventoryState) => {
        let effectFocus: BattlefieldRegion;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user.containingRegion!;
        }
        inventory.addResourceInventory(effectFocus.collectResources());
    });

    public static readonly Refresh = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', amount: number) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        effectFocus.addActions(amount);
    });

    public static readonly Harvest = EffectType.fromUnitFunction((user: Unit, target: Unit, focus: 'target' | 'user', inventory: InventoryState) => {
        let effectFocus: Unit;
        if (focus === 'target') {
            effectFocus = target;
        } else {
            effectFocus = user;
        }
        inventory.addResourceInventory(effectFocus.buildCost);
        effectFocus.die(false);
    });

    public applyToUnit(user: Unit, target: Unit, focus: 'target' | 'user', predicate?: EffectPredicate, ...args: any[]): void {
        if (predicate !== undefined && !testEffectPredicate(user, target, predicate)) {
            return;
        }
        this.unitFunc(user, target, focus, ...args);
    }

    public applyToRegion(user: Unit, target: BattlefieldRegion, focus: 'target' | 'user', predicate?: EffectPredicate, ...args: any[]): void {
        this.regionFunc(user, target, focus, ...args);
    }

    public applyToTargetable(user: Unit, target: Targetable, focus: 'target' | 'user', predicate?: EffectPredicate, ...args: any[]): void {
        if (target instanceof BattlefieldRegion) {
            this.applyToRegion(user, target, focus, predicate, ...args);
        } else {
            // safe unless we add more targetable things
            this.applyToUnit(user, target as Unit, focus, predicate, ...args);
        }
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
 */

export type Effect = {focus: 'target' | 'user'; predicate?: EffectPredicate;} & ({type: 'Damage'; amount: number;}
| {type: 'Heal'; amount: number;}
| {type: 'Status'; status: Status;}
| {type: 'Kill';}
| {type: 'MoveTo';}
| {type: 'Collect';}
| {type: 'Harvest';}
| {type: 'Refresh'; amount: number;});

export function applyEffect(effect: Effect, user: Unit, target: Targetable, inventory: InventoryState): void {
    switch (effect.type) {
    case 'Damage':
        EffectType.Damage.applyToTargetable(user, target, effect.focus, effect.predicate, effect.amount);
        return;
    case 'Heal':
        EffectType.Heal.applyToTargetable(user, target, effect.focus, effect.predicate, effect.amount);
        return;
    case 'Status':
        EffectType.Status.applyToTargetable(user, target, effect.focus, effect.predicate, effect.status);
        return;
    case 'Kill':
        EffectType.Kill.applyToTargetable(user, target, effect.focus, effect.predicate);
        return;
    case 'MoveTo':
        EffectType.MoveTo.applyToTargetable(user, target, effect.focus, effect.predicate);
        return;
    case 'Collect':
        EffectType.Collect.applyToTargetable(user, target, effect.focus, effect.predicate, inventory);
        return;
    case 'Harvest':
        EffectType.Harvest.applyToTargetable(user, target, effect.focus, effect.predicate, inventory);
        return;
    case 'Refresh':
        EffectType.Harvest.applyToTargetable(user, target, effect.focus, effect.predicate, effect.amount);
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
    }
}

export function effectToString(effect: Effect): string {
    if (effect.predicate !== undefined) {
        return `If ${effectPredicateToString(effect.predicate)}: ${subEffectToString(effect)}`;
    } else {
        return subEffectToString(effect);
    }
}