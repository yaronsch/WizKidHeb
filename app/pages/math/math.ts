import {Page, NavController} from 'ionic-angular';
import {AdditionPage} from "./addition/addition";
import {SubtractionPage} from "./subtraction/subtraction";
import {CountingPage} from "./counting/counting";
import {Hud} from "../../components/hud/hud";
import {StaticDataService} from "../../services/static-data-service";

@Page({
    templateUrl: 'build/pages/math/math.html',
    directives: [Hud]
})
export class MathPage {
    private menuData;

    constructor(private nav:NavController, private dataService:StaticDataService) {
        this.nav = nav;
        this.menuData = dataService.data.menu[1];
    }

    launchGame(game) {
        switch (game.id) {
            case 1:
                this.nav.push(CountingPage);
                break;
            case 2:
                this.nav.push(AdditionPage);
                break;
            case 3:
                this.nav.push(SubtractionPage);
                break;

        }
    }
}
