import {Component} from 'angular2/core';
import {Input} from "angular2/core";
import {Output} from "angular2/core";

@Component({
    selector: 'letter',
    template: `
    <div clas="letter">
        <img *ngIf="image" src="../../build/images/themes/clouds/letters/{{image}}.png"/>
        <div *ngIf="!image" class="blank-letter"></div>
    </div>
    `
})
export class Letter {
    @Input() image: string;
    constructor() {

    }
}
