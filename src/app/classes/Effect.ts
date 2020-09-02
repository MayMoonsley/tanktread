import { Unit } from './Unit';

export type Effect
    = {type: 'damageTarget'; amount: number;}
    | {type: 'healTarget'; amount: number;}
    | {type: 'damageUser'; amount: number;}
    | {type: 'healUser'; amount: number;};

export function applyEffect(effect: Effect, user: Unit, target: Unit): boolean {
    switch (effect.type) {
    case 'damageTarget':
        target.wound(effect.amount);
        return true;
    case 'healTarget':
        target.heal(effect.amount);
        return true;
    case 'damageUser':
        user.wound(effect.amount);
        return true;
    case 'healUser':
        user.heal(effect.amount);
        return true;
    }
}

export function effectToString(effect: Effect): string {
    switch (effect.type) {
    case 'damageTarget':
        return `Deal ${effect.amount} damage.`;
    case 'healTarget':
        return `Heal ${effect.amount} health.`;
    case 'damageUser':
        return `Take ${effect.amount} damage.`;
    case 'healUser':
        return `Heal self for ${effect.amount} health.`;
    }
}
