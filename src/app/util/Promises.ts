export namespace Promises {

    export function wait(seconds: number): Promise<void> {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                resolve();
            }, seconds * 1000);
        });
    }

}