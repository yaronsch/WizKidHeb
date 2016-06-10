import {Page, NavController} from 'ionic-angular';
import {WordsPage} from "../words/words";
import {MathPage} from "../math/math";
import {GeneralKnowledgePage} from "../general/general";
import {StaticDataService} from "../../services/static-data-service";
import {StorageService} from "../../services/storage-service";

@Page({
    templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
    constructor(private nav: NavController, private dataService: StaticDataService, storageService: StorageService) {

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
