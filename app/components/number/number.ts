import {Component} from 'angular2/core';
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {ViewEncapsulation} from "angular2/core";

@Component({
    selector: 'number',
    template: `
    <div class="number">
        <span *ngIf="digits" ><img *ngFor="#digit of digits" src="build/images/themes/clouds/letters/{{digit}}.png"/></span>
        <div *ngIf="!value" class="blank-number"></div>
    </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class Number {
    @Input() value: string;
    digits :string[];
    constructor() {

    }

    ngOnInit() {
        this.digits = this.value.split('');
    }
}
