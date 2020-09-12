export enum Status{
    Fire, // take one damage at the end of every turn
    Advantage // extra free action
}

export function getStatusName(status: Status): string {
    switch (status) {
    case Status.Fire:
        return 'Fire';
    case Status.Advantage:
        return 'Advantage';
    }
}

export function getStatusEmoji(status: Status): string {
    switch (status) {
    case Status.Fire:
        return '🔥';
    case Status.Advantage:
        return '⏩';
    }
}