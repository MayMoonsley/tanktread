export class Note {

    private constructor(public readonly title: string, public readonly body: string) {}

    public static readonly Welcome = new Note('CONGRATULATIONS, CITIZEN!',
    `
    We're glad to inform you that you're one of the winners of this month's debtors' lottery! You'll get to hunt the alien lifeforms living outside your hermetically-sealed dome from a state-of-the-art fungus-proof tank! All net proceeds from sale of materials acquired will be used to pay off your outstanding debts.

    Please be aware that you are responsible for both your pre-existing 500&curren; debt and the additional cost of your tank, gene therapies, life insurance, etc. In total, your debt amounts to **5000&curren;** and must be paid in full before you may retire from service.

    We are all wishing you a meritorious term as pilot!

    ---

    Dallas "Dale" Breckenridge

    Chairman of the Interlock Committee for Post-Blight Living
    `
    );


}