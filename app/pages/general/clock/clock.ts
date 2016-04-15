import {Page, NavController} from "ionic-angular";
import {DataService} from "../../../services/data-service";
import {Hud} from "../../../components/hud/hud";

@Page({
    templateUrl: 'build/pages/general/clock/clock.html',
    directives: [Hud],
    pipes: []
})
export class ClockPage {
    gameData: any;
    background: number = 0;

    constructor(private dataService: DataService, private nav: NavController) {
        this.gameData = dataService.data.menu[2].games[0];
        // this.nextExercise();
    }
}