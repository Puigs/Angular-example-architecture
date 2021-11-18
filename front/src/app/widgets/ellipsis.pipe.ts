import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
    transform(value: unknown, nb_max = 10): string {
        if (typeof value !== 'string') return '';
        if (nb_max - 3 < value.length) {
            return value.substr(0, nb_max - 3) + '...';
        }
        return value;
    }
}
