import { SkillTargetingMode } from '../classes/Skill';

export interface Skill {
    name: string,
    description: string,
    targetingMode: SkillTargetingMode
}