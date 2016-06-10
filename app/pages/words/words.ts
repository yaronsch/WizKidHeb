import {Page, NavController} from 'ionic-angular';
import {SpellingPage} from "./spelling/spelling";
import {Hud} from "../../components/hud/hud";
import {StaticDataService} from "../../services/static-data-service";


@Page({
    templateUrl: 'build/pages/words/words.html',
    directives: [Hud]
})
export class WordsPage {
    private menuData;
    constructor(private nav: NavController, private dataService: StaticDataService) {
        this.nav = nav;
        this.menuData = dataService.data.menu[0];
    }

    launchGame(game) {
        switch (game.id) {
            case 1:
                this.nav.push(SpellingPage);
                break;

        }

    }
}
