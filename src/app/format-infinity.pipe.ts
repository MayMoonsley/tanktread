import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatInfinity'
})
export class FormatInfinityPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        if (value === Infinity) {
            return '∞';
        } else if (typeof value === 'string') {
            return value.replace(/Infinity/g, '∞');
        }
        return value;
    }

}
