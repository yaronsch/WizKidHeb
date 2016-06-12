import {Component, ViewEncapsulation, Input, Output, EventEmitter} from "@angular/core";
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
            <button *ngIf="showNextEx" (click)="nextEx()">התרגיל הבא</button>
            <div *ngIf="playerData" class="level-select">
                <ion-item>         
                    <ion-label></ion-label>
                    <ion-select [ngModel]="playerData.level" (ngModelChange)="onLevelSelected($event)"
                    okText="אישור" cancelText="ביטול" [alertOptions]="{title:'רמת קושי'}">
                        <ion-option value="1">קל</ion-option>
                        <ion-option value="2">בינוני</ion-option>
                        <ion-option value="3">קשה</ion-option>                
                     </ion-select>                     
                </ion-item>               
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class Hud {
    @Input() playerData: PlayerDataService;
    @Input() showNextEx: boolean;
    @Output('nextEx') nextExClicked: EventEmitter<any> = new EventEmitter();
    constructor(private nav: NavController) {}

    goBack() {
        this.nav.pop();
    }
    
    nextEx() {
        this.nextExClicked.emit('clicked');
    }

    onLevelSelected(level: number) {
        this.playerData.level = level;
    }
}