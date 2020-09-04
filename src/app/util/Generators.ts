import { Random } from './Random';

export namespace Generators {

    export function cycle<T>(arr: T[]): Generator<T> {
        if (arr.length === 0) {
            throw new Error('Cannot cycle an empty array');
        }
        return function*() {
            let index = 0;
            while (true) {
                yield arr[index];
                index = (index + 1) % arr.length;
            }
        }();
    }

    export function shuffleCycle<T>(arr: T[]): Generator<T> {
        if (arr.length === 0) {
            throw new Error('Cannot cycle an empty array');
        }
        return function*() {
            let index = 0;
            while (true) {
                yield arr[index];
                index++;
                if (index >= arr.length) {
                    arr = Random.shuffle(arr);
                    index = 0;
                }
            }
        }();
    }

}