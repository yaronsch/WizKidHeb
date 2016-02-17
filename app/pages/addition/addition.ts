import {Page} from 'ionic-framework/ionic';
import {DataService} from "../../services/data-service";
import {ShuffleArray} from "../../pipes/shuffle";
import {Letter} from "../../components/letter/letter";
import {Number} from "../../components/number/number";
const MAX: number = 99;
const MIX__IT_UP: number = 20;
const MIN_MAX_RATIO: number = 0.4;
const NUM_SUGGESTIONS: number = 4;

@Page({
  templateUrl: 'build/pages/addition/addition.html',
    directives: [Letter, Number],
    pipes: [ShuffleArray]
})
export class AdditionPage {
    gameData: any;
    max: number = 5;
    min = 2;
    exNumbers: any = {a: 0, b: 0};
    suggestions: string[];

    constructor(private dataService: DataService) {
        this.gameData = dataService.data.games[0];
        this.nextExercise();
    }

    nextExercise() {
        this.exNumbers = this.generateNumbers();
        if (this.max < MIX__IT_UP) {
            this.exNumbers.find = 'target';
        }
        else {
            let whatToFind = Math.floor(Math.random() * 3);
            switch (whatToFind) {
                case 0:
                    this.exNumbers.find = 'target';
                    break;
                case 1:
                    this.exNumbers.find = 'a';
                    break;
                case 2:
                    this.exNumbers.find = 'b';
                    break;
            }
        }
        this.generateSuggestions();
    }

    generateSuggestions() {
        let tempSuggestions: number[] = [this.exNumbers[this.exNumbers.find]];
        for (let i=0; i<NUM_SUGGESTIONS-1; i++) {
            let suggestion = Math.floor(Math.random() * Math.min(MAX, this.max + 5));
            while (tempSuggestions.indexOf(suggestion) !== -1) {
                suggestion = Math.floor(Math.random() * Math.min(MAX, this.max + 5));
            }
            tempSuggestions.push(suggestion);
        }
        this.suggestions = tempSuggestions.map(item => item.toString());

    }

    numberClicked(event, num) {
        if (num === this.exNumbers[this.exNumbers.find]) {
            //TODO success
            this.exNumbers.success = true;
            if (this.max < MAX) {
                this.max++;
                this. min = Math.floor(MIN_MAX_RATIO * this.max);
            }
            this.onComplete();
        }
        else {
            //TODO fail
        }
    }

    onComplete() {
        setTimeout(() => {this.nextExercise()}, 1000);
    }

    generateNumbers() {
        let target = Math.round(Math.random() * (this.max - this.min)) + this.min;
        let a = Math.ceil(Math.random() * (target - (this.max >= MIX__IT_UP ? 0 : 1)));
        let b = target - a;
        let nums = {a, b, target};
        while (nums.a === this.exNumbers.a && nums.b === this.exNumbers.b) {
            target = Math.round(Math.random() * (this.max - this.min)) + this.min;
            a = Math.ceil(Math.random() * (target - (this.max >= MIX__IT_UP ? 0 : 1)));
            b = target - a;
            nums = {a, b, target};
        }
        return nums;
    }
}
