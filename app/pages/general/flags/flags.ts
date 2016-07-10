import {Page} from "ionic-angular";
import {Hud} from "../../../components/hud/hud";
import {ShuffleArray} from "../../../pipes/shuffle";
import {StaticDataService} from "../../../services/static-data-service";


const NUM_SUGGESTIONS: number = 4;
const CATEGORY = 2;
const GAME = 1;

@Page({
    templateUrl: 'build/pages/general/flags/flags.html',
    directives: [Hud],
    pipes: [ShuffleArray],
    providers: []
})
export class FlagsPage {
    gameData: any;
    country: any;

    constructor(private staticDataService: StaticDataService) {
        this.gameData = staticDataService.data.menu[CATEGORY].games[GAME];        
        this.nextExercise();
    }

    nextExercise() {
        let index = Math.floor(Math.random() * this.gameData.data.flags.length);
        this.country = this.gameData.data.flags[index];
    }
}
