import {Page, NavController} from 'ionic-angular';
import {ClockPage} from "./clock/clock";
import {Hud} from "../../components/hud/hud";
import {StaticDataService} from "../../services/static-data-service";


@Page({
    templateUrl: 'build/pages/general/general.html',
    directives: [Hud]
})
export class GeneralKnowledgePage {
    private menuData;
    constructor(private nav: NavController, private dataService: StaticDataService) {
        this.nav = nav;
        this.menuData = dataService.data.menu[2];
    }

    launchGame(game) {
        switch (game.id) {
            case 1:
                this.nav.push(ClockPage);
                break;

        }

    }
}
