import {Page, NavController} from 'ionic-angular';
import {DataService} from '../../services/data-service'
import {WordsPage} from "../words/words";
import {MathPage} from "../math/math";
import {GeneralKnowledgePage} from "../general/general";

@Page({
    templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
    constructor(private nav: NavController, private dataService: DataService) {

    }

    launchSubMenu(subMenu) {
        switch (subMenu.id) {
            case 1:
                this.nav.push(WordsPage);
                break;
            case 2:
                this.nav.push(MathPage);
                break;
            case 3:
                this.nav.push(GeneralKnowledgePage);
                break;
        }

    }
}
