import {Page} from "ionic-angular";
import {Hud} from "../../../components/hud/hud";
import {StaticDataService} from "../../../services/static-data-service";
import {PlayerDataService} from "../../../services/player-data-service";
import {ShuffleArray} from "../../../pipes/shuffle";

const NUM_SUGGESTIONS: number = 4;
const CATEGORY = 2;
const GAME = 0;
const LEVELS_THRESHOLDS = [25, 50];
const MINUTE_RESOLUTIONS = [30, 15, 5];

@Page({
    templateUrl: 'build/pages/general/clock/clock.html',
    directives: [Hud],
    pipes: [ShuffleArray],
    providers: []
})
export class ClockPage {
    gameData: any;
    dayBG: boolean;
    time: number[] = [0, 0];
    timeStr: string = '12:00';
    suggestions: string[];
    hourRotation: number;
    minuteRotation: number;

    constructor(private staticDataService: StaticDataService, private playerData: PlayerDataService) {
        this.gameData = staticDataService.data.menu[CATEGORY].games[GAME];
        this.playerData.setGameData(CATEGORY, GAME, LEVELS_THRESHOLDS);
        this.nextExercise();
    }
    
    nextExercise() {
        this.dayBG = Math.random() > 0.5;        
        this.time = this.generateTime();
        this.timeStr = ClockPage.timeToString(this.time);
        this.calcRotation();
        this.generateSuggestions();     
    }
    
    calcRotation() {
        this.hourRotation = this.time[0] * 30 + this.time[1] * 0.5;
        this.minuteRotation = this.time[1] * 6;
    }

    generateTime() {
        let hour = Math.floor(Math.random() * 12);
        let minuteResolution = MINUTE_RESOLUTIONS[(this.playerData.level - 1)];
        let minute = Math.floor(Math.floor(Math.random() * 60) / minuteResolution) * minuteResolution;
        return [hour, minute];
    }

    generateSuggestions() {
        let suggestions = [this.timeStr];
        while (suggestions.length < NUM_SUGGESTIONS) {
            let suggestion = ClockPage.timeToString(this.generateTime());
            while (suggestions.indexOf(suggestion) > -1) {
                suggestion = ClockPage.timeToString(this.generateTime());
            }
            suggestions.push(suggestion);
        }
        this.suggestions = suggestions;
    }
    
    hourClicked(event, value) {
        if (value === this.timeStr) {
            this.playerData.addPoints(1);
            //TODO success
            setTimeout(() => {                
                this.nextExercise();
            }, 500);
        }
        else {
            this.playerData.addPoints(-1);
            //TODO fail
        }
    }
    
    static timeToString(time) {
        let pad = num => num < 10 ? '0' + num : num;        
        return `${time[0] === 0 ? 12 : time[0]}:${pad(time[1])}`;
    }
        
}