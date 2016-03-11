import {Page, NavController} from 'ionic-framework/ionic';
import {DataService} from "../../services/data-service";
import {SpellingPage} from "../spelling/spelling";


@Page({
    templateUrl: 'build/pages/words/words.html',
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
