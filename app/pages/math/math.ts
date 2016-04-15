import {Page, NavController} from 'ionic-angular';
import {DataService} from "../../services/data-service";
import {AdditionPage} from "./addition/addition";
import {SubtractionPage} from "./subtraction/subtraction";
import {CountingPage} from "./counting/counting";
import {Hud} from "../../components/hud/hud";

@Page({
    templateUrl: 'build/pages/math/math.html',
    directives: [Hud]
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
