import { Unit } from '../classes/Unit';
import { Skill } from '../classes/Skill';

export interface Targetable {

    applySkill: (user: Unit, skill: Skill) => void;

}