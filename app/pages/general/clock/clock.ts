import {Page} from "ionic-angular";
import {Hud} from "../../../components/hud/hud";
import {StaticDataService} from "../../../services/static-data-service";
import {PlayerDataService} from "../../../services/player-data-service";

const NUM_SUGGESTIONS: number = 4;
const CATEGORY = 2;
const GAME = 0;
const LEVELS_THRESHOLDS = [25, 50];
const MINUTE_RESOLUTIONS = [30, 15, 5];

@Page({
    templateUrl: 'build/pages/general/clock/clock.html',
    directives: [Hud],
    pipes: [],
    providers: []
})
export class ClockPage {
    gameData: any;
    background: number = 0;
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
        this.calcRotation();
        this.time = this.generateTime();
        this.timeStr = ClockPage.timeToString(this.time);
        this.generateSuggestions();
        this.calcRotation();
    }
    
    calcRotation() {
        this.hourRotation = this.time[0] * 30 + this.time[1] * 0.5;
        this.minuteRotation = this.time[1] * 6;
    }

    generateTime() {
        let hour = Math.floor(Math.random() * 12);
        let minuteResolution = MINUTE_RESOLUTIONS[(this.playerData.level - 1)];
        let minute = Math.floor(Math.random() * 60) % minuteResolution * minuteResolution;
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
    
    static timeToString(time) {
        let pad = num => num < 10 ? '0' + num : num;        
        return `${pad(time[0] === 0 ? 12 : time[0])}:${pad(time[1])}`;
    }
        
}