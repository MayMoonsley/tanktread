export namespace Arrays {

    export function removeFrom<T>(toRemove: T, array: T[]): T[] {
        return array.filter(x => x !== toRemove);
    }

    export function flatten<T>(array: T[][]): T[] {
        return array.reduce((acc, x) => acc.concat(x));
    }

}