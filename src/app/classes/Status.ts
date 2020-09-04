export enum Status{
    Fire // take one damage at the end of every turn
}

export function getStatusName(status: Status): string {
    switch (status) {
        case Status.Fire:
            return 'Fire';
    }
}

export function getStatusEmoji(status: Status): string {
    switch (status) {
        case Status.Fire:
            return '🔥';
    }
}