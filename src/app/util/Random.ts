export namespace Random {

    export function boolean(chance: number): boolean {
        return Math.random() < chance;
    }

    export function float(min: number, max: number): number {
        return (Math.random() * (max - min)) + min;
    }

    export function int(min: number, max: number): number {
        return float(min, max) | 0;
    }

    export function fromArray<T>(arr: T[]): T {
        return arr[int(0, arr.length)];
    }

    export function shuffle<T>(arr: T[]): T[] {
        const result: T[] = [];
        for (let elem of arr) {
            result.push(elem);
        }
        for (let i = 0; i < result.length - 1; i++) {
            const j = int(i, result.length);
            const temp = result[i];
            result[i] = result[j];
            result[j] = temp;
        }
        return result;
    }

    export function weightedRandom<T>(arr: [T, number][]): T {
        let total: number = 0;
        for (let elem of arr) {
            total += elem[1];
        }
        const index = float(0, total);
        let rollingSum: number = 0;
        for (let elem of arr) {
            rollingSum += elem[1];
            if (index < rollingSum) {
                return elem[0];
            }
        }
        // this should be impossible
        throw new Error('weightedRandom failed to find a result');
    }

}