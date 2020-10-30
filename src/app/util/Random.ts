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

    export function point(width: number, height: number): [number, number] {
        return [int(0, width), int(0, height)];
    }

    export function points(num: number, width: number, height: number): [number, number][] {
        const r: [number, number][] = [];
        while (r.length < num) {
            let p: [number, number] = point(width, height);
            if (!r.some(otherPoint => otherPoint[0] === p[0] && otherPoint[1] === p[1])) {
                r.push(p);
            }
        }
        return r;
    }

    export function fromArray<T>(arr: T[]): T {
        return arr[int(0, arr.length)];
    }

    export function shuffle<T>(arr: T[]): T[] {
        const result: T[] = [];
        for (const elem of arr) {
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
        let total = 0;
        for (const elem of arr) {
            total += elem[1];
        }
        const index = float(0, total);
        let rollingSum = 0;
        for (const elem of arr) {
            rollingSum += elem[1];
            if (index < rollingSum) {
                return elem[0];
            }
        }
        // this should be impossible
        throw new Error('weightedRandom failed to find a result');
    }

}
