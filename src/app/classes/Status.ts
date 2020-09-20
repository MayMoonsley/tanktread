export class Status {

    public static readonly Fire = new Status('Fire', '🔥', 'Take one damage at the start of every turn.');
    public static readonly Advantage = new Status('Advantage', '⏩', 'Extra free action.');
    public static readonly MindControl = new Status('Hypnotized', '🎮', 'Under enemy control.');
    public static readonly Armored = new Status('Armored', '🛡️', 'Take one less damage from attacks.');

    private constructor(
        public readonly name: string,
        public readonly emoji: string,
        public readonly desc: string
    ) {};

}