export class CreditsEntry {

    private constructor(
        public readonly name: string,
        public readonly duties: string[]
    ) {}

    get dutiesString(): string {
        return this.duties.join(', ');
    }

    public static readonly May = new CreditsEntry('May Lawver', ['team lead', 'programming']);
    public static readonly Mitchell = new CreditsEntry('Mitchell Philipp', ['programming']);
    public static readonly Lilly = new CreditsEntry('Lilly Rizvi', ['photography']);
    public static readonly Grace = new CreditsEntry('Grace Rarer', ['programming']);
    public static readonly Nicole = new CreditsEntry('Nicole Prindle', ['continuous integration', 'programming']);

}