import {Page, NavController} from "ionic-angular";
import {Hud} from "../../../components/hud/hud";
import {StaticDataService} from "../../../services/static-data-service";

@Page({
    templateUrl: 'build/pages/general/clock/clock.html',
    directives: [Hud],
    pipes: []
})
export class ClockPage {
    gameData: any;
    background: number = 0;
    level: string = 'beginner';
    time: number[];
    hourRotation: number;
    minuteRotation: number;

    constructor(private staticDataService: StaticDataService, private nav: NavController) {
        this.gameData = staticDataService.data.menu[2].games[0];
        this.nextExercise();
    }
    
    nextExercise() {
        this.time = [0,0];
        this.calcRotation();
        setTimeout(() => {
            this.time = [3,33];
            this.calcRotation();
        }, 1000);
    }
    
    calcRotation() {
        this.hourRotation = this.time[0] * 30 + this.time[1] * 0.5;
        this.minuteRotation = this.time[1] * 6;
    }
}