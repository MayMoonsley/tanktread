export namespace Arrays {

    export function removeFrom<T>(toRemove: T, array: T[]): T[] {
        return array.filter(x => x !== toRemove);
    }

    export function flatten<T>(array: T[][]): T[] {
        return array.reduce((acc, x) => acc.concat(x));
    }

    export function addWithoutDuplicate<T>(toAdd: T, array: T[]): T[] {
        if (array.includes(toAdd)) {
            return array;
        }
        return array.concat([toAdd]);
    }

}