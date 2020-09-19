export enum Status{
    Fire, // take one damage at the end of every turn
    Advantage, // extra free action
    MindControl, // make enemy controllable by the player
    Armored // take one less damage from every attack
}

export function getStatusName(status: Status): string {
    switch (status) {
    case Status.Fire:
        return 'Fire';
    case Status.Advantage:
        return 'Advantage';
    case Status.MindControl:
        return 'Hypnotized';
    case Status.Armored:
        return 'Armored';
    }
}

export function getStatusEmoji(status: Status): string {
    switch (status) {
    case Status.Fire:
        return '🔥';
    case Status.Advantage:
        return '⏩';
    case Status.MindControl:
        return '🎮';
    case Status.Armored:
        return '🛡️';
    }
}