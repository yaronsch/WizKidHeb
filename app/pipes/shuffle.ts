import {Injectable, Pipe} from '@angular/core';

@Pipe({
    name: 'shuffle'
})
@Injectable()
export class ShuffleArray {
    /*
     Takes an array or string and reverses it
     */
    transform(value) {
        if (!Array.isArray(value)) {
            return value;
        }
        let currentIndex = value.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = value[currentIndex];
            value[currentIndex] = value[randomIndex];
            value[randomIndex] = temporaryValue;
        }

        return value;
    }
}
