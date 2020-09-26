import { Unit } from '../interfaces/Unit';
import { BattlefieldRegion } from './BattlefieldRegion';
import { Status } from './Status';
import { Types } from '../util/Types';
import { Targetable } from '../interfaces/Targetable';
import { InventoryState } from '../state-trackers/InventoryState';

export class EffectType {

    private constructor(private unitFunc: (user: Unit, target: Unit, ...args: any[]) => void,
        private regionFunc: (user: Unit, target: BattlefieldRegion, ...args: any[]) => void) {}

    private static fromUnitFunction(toUnit: (user: Unit, target: Unit, ...args: any[]) => void): EffectType {
        const toRegion = (user: Unit, target: BattlefieldRegion, ...args: any[]): void => {
            for (const unit of target.units) {
                toUnit(user, unit, ...args);
            }
        };
        return new EffectType(toUnit, toRegion);
    }

    private static fromRegionFunction(toRegion: (user: Unit, target: BattlefieldRegion, ...args: any[]) => void): EffectType {
        const toUnit = (user: Unit, target: Unit, ...args: any[]): void => {
            if (target.containingRegion !== undefined) {
                toRegion(user, target.containingRegion, ...args);
            }
        };
        return new EffectType(toUnit, toRegion);
    }

    public static readonly Damage = EffectType.fromUnitFunction((user: Unit, target: Unit, damage: number) => {
        target.wound(damage);
    });

    public static readonly Heal = EffectType.fromUnitFunction((user: Unit, target: Unit, amount: number) => {
        target.heal(amount);
    });

    public static readonly Status = EffectType.fromUnitFunction((user: Unit, target: Unit, status: Status) => {
        target.addStatus(status);
    });

    public static readonly Kill = EffectType.fromUnitFunction((user: Unit, target: Unit) => {
        target.die();
    });

    public static readonly MoveTo = EffectType.fromRegionFunction((user: Unit, target: BattlefieldRegion) => {
        user.moveTo(target);
    });

    public static readonly Collect = EffectType.fromRegionFunction((user: Unit,
        target: BattlefieldRegion, inventory: InventoryState) => {
        inventory.addResourceInventory(target.collectResources());
    });

    public static readonly Harvest = EffectType.fromUnitFunction((user: Unit, target: Unit, inventory: InventoryState) => {
        inventory.addResourceInventory(target.buildCost);
        target.die(false);
    });

    public applyToUnit(user: Unit, target: Unit, ...args: any[]): void {
        this.unitFunc(user, target, ...args);
    }

    public applyToRegion(user: Unit, target: BattlefieldRegion, ...args: any[]): void {
        this.regionFunc(user, target, ...args);
    }

    public applyToTargetable(user: Unit, target: Targetable, ...args: any[]): void {
        if (target instanceof BattlefieldRegion) {
            this.applyToRegion(user, target, ...args);
        } else {
            // safe unless we add more targetable things
            this.applyToUnit(user, target as Unit, ...args);
        }
    }

}

export type Effect = {focus: 'target' | 'user';} & ({type: 'Damage'; amount: number;}
| {type: 'Heal'; amount: number;}
| {type: 'Status'; status: Status;}
| {type: 'Kill';}
| {type: 'MoveTo';}
| {type: 'Collect';}
| {type: 'Harvest';});

export function applyEffect(effect: Effect, user: Unit, target: Targetable, inventory: InventoryState): void {
    let focus: Targetable;
    if (effect.focus === 'target') {
        focus = target;
    } else {
        focus = user;
    }
    switch (effect.type) {
    case 'Damage':
        EffectType.Damage.applyToTargetable(user, focus, effect.amount);
        return;
    case 'Heal':
        EffectType.Heal.applyToTargetable(user, focus, effect.amount);
        return;
    case 'Status':
        EffectType.Status.applyToTargetable(user, focus, effect.status);
        return;
    case 'Kill':
        EffectType.Kill.applyToTargetable(user, focus);
        return;
    case 'MoveTo':
        EffectType.MoveTo.applyToTargetable(user, focus);
        return;
    case 'Collect':
        EffectType.Collect.applyToTargetable(user, focus, inventory);
        return;
    case 'Harvest':
        EffectType.Harvest.applyToTargetable(user, focus, inventory);
        return;
    default:
        return Types.impossible(effect);
    }
}

export function effectToString(effect: Effect): string {
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
    }
}
