import {Page} from 'ionic-angular';
import {Letter} from "../../../components/letter/letter";
import {ShuffleArray} from "../../../pipes/shuffle";
import {TextDirection} from "../../../pipes/direction";
import {Hud} from "../../../components/hud/hud";
import {StaticDataService} from "../../../services/static-data-service";
import {PlayerDataService} from "../../../services/player-data-service";

const NUM_SUGGESTIONS: number = 8;
const CATEGORY = 0;
const GAME = 0;
const LEVELS_THRESHOLDS = [10, 30];

@Page({
    templateUrl: 'build/pages/words/spelling/spelling.html',
    directives: [Letter, Hud],
    pipes: [TextDirection, ShuffleArray],
    providers: [PlayerDataService]
})
export class SpellingPage {

    gameData: any;    
    currentWord: any;
    currentIndex:number;
    currentWordSpelling: string[];
    suggestions = [];
    result = [];
    private availableWords = [];
    constructor(private staticDataService: StaticDataService, private playerData: PlayerDataService) {
        this.gameData = staticDataService.data.menu[CATEGORY].games[GAME];
        this.playerData.setGameData(CATEGORY, GAME, LEVELS_THRESHOLDS);
        this.nextWord();
    }

    nextWord() {
        if (this.availableWords.length === 0) {
            this.availableWords = this.gameData.data.words[("level" + this.playerData.level)].slice(0);
        }
        let wordIndex = Math.floor(Math.random() * this.availableWords.length);
        this.currentWord = this.availableWords.splice(wordIndex, 1)[0];
        this.currentIndex = 0;
        this.currentWordSpelling = this.currentWord.spelling.split('');

        this.result = this.currentWordSpelling.map(item => "");
        this.generateSuggestions();
    }

    generateSuggestions() {
        let fakeLetters = new Array(NUM_SUGGESTIONS - this.currentWord.spelling.length);
        for (let i=0; i<fakeLetters.length; i++) {
            let index = Math.floor(Math.random() * Object.keys(this.staticDataService.data.letters).length);
            fakeLetters[i] = {value:  Object.keys(this.staticDataService.data.letters)[index], used: false};
        }

        this.suggestions = this.currentWordSpelling.map(l => {
            return {value: l, used: false};
        }).concat(fakeLetters);
    }

    letterClicked(event, letter) {
        if (letter.used) {
            return;
        }
        if (letter.value === this.currentWordSpelling[this.currentIndex]) {
            //TODO letter success!
            this.result[this.currentIndex] = letter.value;
            this.result = this.result.concat();
            letter.used = true;
            this.currentIndex++;
            if (this.currentIndex === this.currentWordSpelling.length) {
                //TODO work success!!!
                let levelChanged: boolean = this.playerData.addPoints(1);
                if (levelChanged) {
                    this.availableWords = this.gameData.data.words[("level" + this.playerData.level)].slice(0);
                }
                this.onComplete();
            }
        }
        else {
            this.playerData.addPoints(-1);
            //TODO fail :(
        }
    }

    onComplete() {
        setTimeout(() => {this.nextWord()}, 1000);
    }
}
