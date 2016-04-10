import {Component, SimpleChange} from 'angular2/core';
import {Input} from "angular2/core";
import {ViewEncapsulation} from "angular2/core";

@Component({
    selector: 'number',
    template: `
    <div class="number" [ngClass]="{'single-digit': digits && digits.length === 1, 'double-digit': digits && digits.length === 2}">
        <span *ngIf="digits" ><img *ngIf="frame" class="frame" src="build/images/themes/{{theme}}/letters/frame.png">
        <img *ngFor="#digit of digits" src="build/images/themes/{{theme}}/letters/{{digit}}.png"/></span>
        <img *ngIf="!value && value !== 0" class="blank-number" src="build/images/themes/{{theme}}/letters/line.png"/>        
    </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class Number {
    @Input() value: string;
    @Input() theme: string;
    @Input() frame: boolean;
    digits :string[];
    constructor() {

    }

    ngOnInit() {
        this.digits = this.value.toString().split('');
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        for (let propName in changes) {
            if (propName === 'value' && changes[propName].currentValue !== changes[propName].previousValue) {
                this.digits = changes[propName].currentValue.toString().split('');
            }
        }
    }
}
