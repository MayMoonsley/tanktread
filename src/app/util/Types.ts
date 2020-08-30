export namespace Types {

    export function impossible(x: never): never {
        throw new Error('this code should be unreachable');
    }

}