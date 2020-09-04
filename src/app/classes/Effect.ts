import { Unit } from './Unit';
import { Status, getStatusName } from './Status';

export type Effect
    = {type: 'damageTarget'; amount: number;}
    | {type: 'healTarget'; amount: number;}
    | {type: 'statusTarget'; status: Status}
    | {type: 'damageUser'; amount: number;}
    | {type: 'healUser'; amount: number;}
    | {type: 'statusUser'; status: Status;}
    | {type: 'moveTo'};

export function applyEffect(effect: Effect, user: Unit, target: Unit): boolean {
    switch (effect.type) {
    case 'damageTarget':
        target.wound(effect.amount);
        return true;
    case 'healTarget':
        target.heal(effect.amount);
        return true;
    case 'statusTarget':
        target.addStatus(effect.status);
        return true;
    case 'damageUser':
        user.wound(effect.amount);
        return true;
    case 'healUser':
        user.heal(effect.amount);
        return true;
    case 'statusUser':
        user.addStatus(effect.status);
    case 'moveTo':
        if (user.containingRegion !== target.containingRegion && target.containingRegion !== undefined) {
            user.moveTo(target.containingRegion);
        }
        return true;
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
    case 'damageUser':
        return `Take ${effect.amount} damage.`;
    case 'healUser':
        return `Heal self for ${effect.amount} health.`;
    case 'statusUser':
        return `Gain ${getStatusName(effect.status)}.`;
    case 'moveTo':
        return 'Move to target.';
    }
}
