import {Page, NavController} from 'ionic-angular';
import {DataService} from "../../services/data-service";
import {AdditionPage} from "./addition/addition";
import {SubtractionPage} from "./subtraction/subtraction";

@Page({
    templateUrl: 'build/pages/math/math.html',
})
export class MathPage {
    private menuData;

    constructor(private nav:NavController, private dataService:DataService) {
        this.nav = nav;
        this.menuData = dataService.data.menu[1];
    }

    launchGame(game) {
        switch (game.id) {
            case 1:
                this.nav.push(AdditionPage);
                break;
            case 2:
                this.nav.push(SubtractionPage);
                break;

        }
    }

    goBack() {
        this.nav.pop();
    }
}
