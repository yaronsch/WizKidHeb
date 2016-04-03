import {Page, NavController} from 'ionic-angular';
import {DataService} from "../../services/data-service";
import {AdditionPage} from "../addition/addition";

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

        }
    }

    goBack() {
        this.nav.pop();
    }
}
