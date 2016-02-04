import {Page} from 'ionic-framework/ionic';
import {Input} from "angular2/core";
import {DataService} from "../../services/data-service";

@Page({
    templateUrl: 'build/pages/spelling/spelling.html',
})
export class SpellingPage {
    gameData: any;
    constructor(private dataService: DataService) {
        this.gameData = dataService.data.games[0];
    }
}
