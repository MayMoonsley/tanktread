import { Skill } from './Skill';

export interface Unit {
    name: string,
    health: number,
    maxHealth: number,
    skills: Skill[]
}