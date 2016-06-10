import {Component} from '@angular/core';
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'letter',
    template: `
    <div class="letter">
        <img *ngIf="image" class="letter-img" src="build/images/themes/{{theme}}/letters/{{image}}.png"/>
        <img *ngIf="!image" class="letter-img" src="build/images/themes/{{theme}}/letters/line.png" class="blank-letter"/>    
    </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class Letter {
    @Input() image: string;
    @Input() theme: string;
    constructor() {

    }
}
