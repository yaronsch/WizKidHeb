import {Component, ViewEncapsulation} from "angular2/core";
import {NavController} from "ionic-angular";

@Component({
    selector: 'hud',
    template: `
        <div class="top-buttons">            
            <button (click)="goBack()" class="disable-hover button button-default">
                <span class="button-inner"><img src="build/images/buttons/back.png">חזרה </span>
                <ion-button-effect></ion-button-effect>
            </button>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class Hud {
    constructor(private nav: NavController) {}

    goBack() {
        this.nav.pop();
    }
}