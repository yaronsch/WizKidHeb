import {Injectable, Pipe} from 'angular2/core';
import {isArray} from "util";
@Pipe({
  name: 'direction'
})
@Injectable()
export class TextDirection {
    /*
     Takes an array or string and reverses it
    */
    transform(value, args) {
        if (args === 'rtl') {
            if (isArray(value)) {
                return value.reverse();
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
