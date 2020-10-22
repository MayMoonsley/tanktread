import { AIRating } from '../interfaces/AIRating';

export class Status {

    public static readonly Fire = new Status('Fire', '🔥', 'Take one damage at the start of every turn.', AIRating.Bad);
    public static readonly Advantage = new Status('Advantage', '⏩', 'Extra free action.', AIRating.Good);
    public static readonly MindControl = new Status('Hypnotized', '🎮', 'Under enemy control.', AIRating.Bad);
    public static readonly Armored = new Status('Armored', '🛡️', 'Take one less damage from attacks.', AIRating.Good);
    public static readonly Corroded = new Status('Corroded', '🧪', 'Take one more damage from attacks.', AIRating.Bad);
    public static readonly Pheromones = new Status('Pheromones', '⚗️', 'Blend in with creatures. Goes away after using a skill.', AIRating.Good);

    private constructor(
        public readonly name: string,
        public readonly emoji: string,
        public readonly desc: string,
        public readonly rating: AIRating
    ) {}

}