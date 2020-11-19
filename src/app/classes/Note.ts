export class Note {

    private constructor(public readonly title: string, public readonly body: string, public readonly isEnding: boolean = false) {}

    public static readonly Welcome = new Note('CONGRATULATIONS, CITIZEN!',
    `
    We're glad to inform you that you're one of the winners of this month's debtors' lottery! You'll get to hunt the alien lifeforms living outside your hermetically-sealed dome from a state-of-the-art fungus-proof tank! All net proceeds from sale of materials acquired will be used to pay off your outstanding debts.

    Please be aware that you are responsible for both your pre-existing 500&curren; debt and the additional cost of your tank, gene therapies, life insurance, etc. In total, your debt amounts to **5000&curren;** and must be paid in full before you may retire from service.

    In order to comply with Committee regulations and prevent unnecessary losses, you have been given the following informative literature (abridged to save space):

    * _Tank Combat for the Debt-Ridden_
    * _History and Nature of the Blight (Fourth Edition)_
    * _Cities, the Committee, and You_

    We are all wishing you a meritorious term as pilot!

    ---

    Dallas "Dale" Breckenridge

    Chairman of the Interlock Committee for Post-Blight Living
    `
    );

    public static readonly Combat = new Note('Tank Combat for the Debt-Ridden',
    `
    Hello, pilot! I'm sure you're going through a lot right now. Your tank is a state-of-the-art amalgam of machinery and software, but it doesn't make the melding process any easier. Stressed pilots aren't productive pilots, so take your time to recuperate. This guide is here to help you be an effective hunter once the post-gene therapy migraine subsides.

    Historically, most losses came from pilots having to make difficult decisions under time pressure. This problem has been solved by an experimental blend of software and synthetic neurotransmitters. Combat has been abstracted to a clear interface, and it will feel as though you have infinite time to decide what to do. Information on entities, such as nature, physical integrity, and time left to act are determined through extensive machine analysis and displayed with friendly icons.

    Your tank's extensive armor renders it too unwieldy to engage in combat directly. To counteract this, each tank is outfitted with drone-manufacturing capabilities. Each drone requires a certain amount of material to build; the tank produces a certain amount each "turn." Material is represented with a ⚙️ icon; the sidebar allows you to spend said material on units. New schematics can frequently be bought when transacting with cities.

    Drones can be commanded and your tank can be piloted via buttons representing their capabilities. Targetable regions or entities will show up in green and can be selected by clicking on them, and you can cancel a command with the X button next to it.

    Resources in a particular region will be listed at the bottom. They can be collected by your tank and some drones and sold in cities.`);

    public static readonly Blight = new Note('History and Nature of the Blight (Fourth Edition)',
    ``);

    public static readonly Cities = new Note('Cities, the Committee, and You',
    ``)

    public static readonly Victory = new Note('Congratulations On Your Retirement',
    `Commendable service, pilot! The resources you harvested are vital to the continued survival of the last bastions of humanity.

    If you choose to come out of retirement and enter the debtor's lottery again, we'll be rooting for you to win.

    ---

    Dallas "Dale" Breckenridge

    Chairman of the Interlock Committee for Post-Blight Living`, true);

    get available(): boolean {
        return !this.isEnding;
    }


}