import { Unit } from './Unit';
import { Status, getStatusName } from './Status';
import { Game } from '../Game';
import { Types } from '../util/Types';

export type Effect
    = {type: 'damageTarget'; amount: number;}
    | {type: 'healTarget'; amount: number;}
    | {type: 'statusTarget'; status: Status;}
    | {type: 'killTarget';}
    | {type: 'damageUser'; amount: number;}
    | {type: 'healUser'; amount: number;}
    | {type: 'statusUser'; status: Status;}
    | {type: 'killUser';}
    | {type: 'moveTo';}
    | {type: 'collect';};

export function applyEffect(effect: Effect, user: Unit, target: Unit): void {
    switch (effect.type) {
    case 'damageTarget':
        target.wound(effect.amount);
        return;
    case 'healTarget':
        target.heal(effect.amount);
        return;
    case 'statusTarget':
        target.addStatus(effect.status);
        return;
    case 'killTarget':
        target.die();
        return;
    case 'damageUser':
        user.wound(effect.amount);
        return;
    case 'healUser':
        user.heal(effect.amount);
        return;
    case 'statusUser':
        user.addStatus(effect.status);
        return;
    case 'killUser':
        user.die();
        return;
    case 'moveTo':
        if (user.containingRegion !== target.containingRegion && target.containingRegion !== undefined) {
            user.moveTo(target.containingRegion);
        }
        return;
    case 'collect':
        if (user.containingRegion !== undefined) {
            Game.getInventoryState().addResourceInventory(user.containingRegion.collectResources());
        }
        return;
    default:
        return Types.impossible(effect);
    }
}

export function effectToString(effect: Effect): string {
    switch (effect.type) {
    case 'damageTarget':
        return `Deal ${effect.amount} damage.`;
    case 'healTarget':
        return `Heal ${effect.amount} health.`;
    case 'statusTarget':
        return `Give target ${getStatusName(effect.status)}.`;
    case 'killTarget':
        return 'Kill target.';
    case 'damageUser':
        return `Take ${effect.amount} damage.`;
    case 'healUser':
        return `Heal self for ${effect.amount} health.`;
    case 'statusUser':
        return `Gain ${getStatusName(effect.status)}.`;
    case 'killUser':
        return 'Self-destruct.';
    case 'moveTo':
        return 'Move to target.';
    case 'collect':
        return 'Collect resources.';
    }
}
