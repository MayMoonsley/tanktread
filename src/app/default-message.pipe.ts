import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'defaultMessage'
})
export class DefaultMessagePipe implements PipeTransform {

    transform(value: string, message: string): string {
        if (value.trim() === '') {
            return message;
        }
        return value;
    }

}
