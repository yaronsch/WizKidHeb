import {Injectable, Pipe} from '@angular/core';

@Pipe({
  name: 'direction'
})
@Injectable()
export class TextDirection {
    /*
     Takes an array or string and reverses it
    */
    transform(value, direction) {
        if (direction === 'rtl') {
            if (Array.isArray(value)) {
                return value.slice().reverse();
            }
            else {
                value += '';
                return value.split('').reverse().join('');
            }
        }
        else {
            return value;
        }
    }
}
