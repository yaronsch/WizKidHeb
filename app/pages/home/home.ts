import {Page} from 'ionic-framework/ionic';
import {NavController} from 'ionic-framework/components/nav/nav-controller'
import {DataService} from '../../services/data-service'
import {SpellingPage} from "../spelling/spelling";

@Page({
    templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
    constructor(private nav: NavController, private dataService: DataService) {

    }

    launchGame(game) {
        switch (game.id) {
            case 1:
                this.nav.push(SpellingPage);
                break;
        }

    }
}
