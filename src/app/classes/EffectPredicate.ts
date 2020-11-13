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

    public static readonly IsOneOfFaction = new EffectPredicateType(
        (unit: Unit, factions: UnitFaction[]) => factions.includes(unit.faction),
        (focus: string, factions: UnitFaction[]) => `${focus} is one of ${factions.map(
            faction => `${faction} ${Objects.enumKey(UnitFaction, faction)}`
        ).join(', ')}`
    )

    public static readonly IsDead = new EffectPredicateType(
        (unit: Unit) => !unit.alive,
        (focus: string) => `${focus} is dead`
    );

}

export type EffectPredicate = {focus: 'user' | 'target';} & ({type: 'IsFaction'; faction: UnitFaction;}
| {type: 'HasStatus'; status: Status;}
| {type: 'IsDead'}
| {type: 'and'; a: EffectPredicate; b: EffectPredicate;}
| {type: 'or'; a: EffectPredicate; b: EffectPredicate;}
| {type: 'IsOneOfFaction'; factions: UnitFaction[]});

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
    case 'IsOneOfFaction':
        return EffectPredicateType.IsOneOfFaction.test(focus, predicate.factions);
    case 'IsDead':
        return EffectPredicateType.IsDead.test(focus);
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
    case 'IsOneOfFaction':
        return EffectPredicateType.IsOneOfFaction.toString(predicate.focus, predicate.factions);
    case 'IsDead':
        return EffectPredicateType.IsDead.toString(predicate.focus);
    case 'and':
        return `${effectPredicateToString(predicate.a)} and ${effectPredicateToString(predicate.b)}`;
    case 'or':
        return `${effectPredicateToString(predicate.a)} or ${effectPredicateToString(predicate.b)}`;
    default:
        return Types.impossible(predicate);
    }
}