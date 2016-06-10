import {Component, ViewEncapsulation, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {PlayerDataService} from "../../services/player-data-service";

@Component({
    selector: 'hud',
    template: `
        <div class="top-buttons">            
            <button (click)="goBack()" class="disable-hover button button-default">
                <span class="button-inner"><img src="build/images/buttons/back.png">חזרה </span>
                <ion-button-effect></ion-button-effect>
            </button>
            <ion-select *ngIf="playerData" [ngModel]="playerData.level" (ngModelChange)="onLevelSelected($event)">
                <ion-option value="1">קל</ion-option>
                <ion-option value="2">בינוני</ion-option>
                <ion-option value="3">קשה</ion-option>                
             </ion-select>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class Hud {
    @Input() playerData: PlayerDataService;
    constructor(private nav: NavController) {}

    goBack() {
        this.nav.pop();
    }

    onLevelSelected(level: number) {
        this.playerData.level = level;
    }
}