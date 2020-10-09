import { Unit, UnitFaction } from '../interfaces/Unit';
import { Objects } from '../util/Objects';
import { Types } from '../util/Types';
import { Status } from './Status';

export class EffectPredicateType {

    private constructor(private unitFunc: (unit: Unit, ...args: any[]) => boolean, private toStringFunc: (focus: string, ...args: any[]) => string) {}

    public test(unit: Unit, ...args: any[]): boolean {
        return this.unitFunc(unit, ...args);
    }

    public toString(focus: string, ...args: any[]): string {
        return this.toStringFunc(focus, ...args);
    }

    public static readonly HasStatus = new EffectPredicateType(
        (unit: Unit, status: Status) => unit.statuses.includes(status),
        (focus: string, status: Status) => `${focus} has ${status.emoji} ${status.name}`
    );

    public static readonly IsFaction = new EffectPredicateType(
        (unit: Unit, faction: UnitFaction) => unit.faction === faction,
        (focus: string, faction: UnitFaction) => `${focus} is a ${faction} ${Objects.enumKey(UnitFaction, faction)}`
    );

}

export type EffectPredicate = {focus: 'user' | 'target';} & ({type: 'IsFaction'; faction: UnitFaction;}
| {type: 'HasStatus'; status: Status;}
| {type: 'and'; a: EffectPredicate; b: EffectPredicate;}
| {type: 'or'; a: EffectPredicate; b: EffectPredicate;});

export function testEffectPredicate(user: Unit, target: Unit, predicate: EffectPredicate): boolean {
    let focus: Unit;
    if (predicate.focus === 'target') {
        focus = target;
    } else {
        focus = user;
    }
    switch (predicate.type) {
    case 'HasStatus':
        return EffectPredicateType.HasStatus.test(focus, predicate.status);
    case 'IsFaction':
        return EffectPredicateType.IsFaction.test(focus, predicate.faction);
    case 'and':
        return testEffectPredicate(user, target, predicate.a) && testEffectPredicate(user, target, predicate.b);
    case 'or':
        return testEffectPredicate(user, target, predicate.a) || testEffectPredicate(user, target, predicate.b);
    default:
        return Types.impossible(predicate);
    }
}

export function effectPredicateToString(predicate: EffectPredicate): string {
    switch (predicate.type) {
    case 'HasStatus':
        return EffectPredicateType.HasStatus.toString(predicate.focus, predicate.status);
    case 'IsFaction':
        return EffectPredicateType.IsFaction.toString(predicate.focus, predicate.faction);
    case 'and':
        return `${effectPredicateToString(predicate.a)} and ${effectPredicateToString(predicate.b)}`;
    case 'or':
        return `${effectPredicateToString(predicate.a)} or ${effectPredicateToString(predicate.b)}`;
    default:
        return Types.impossible(predicate);
    }
}