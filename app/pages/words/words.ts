import {Page, NavController} from 'ionic-angular';
import {DataService} from "../../services/data-service";
import {SpellingPage} from "./spelling/spelling";
import {Hud} from "../../components/hud/hud";


@Page({
    templateUrl: 'build/pages/words/words.html',
    directives: [Hud]
})
export class WordsPage {
    private menuData;
    constructor(private nav: NavController, private dataService: DataService) {
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
