import {Page} from 'ionic-framework/ionic';
import {Input} from "angular2/core";
import {DataService} from "../../services/data-service";
import {Letter} from "../../components/letter/letter";
import {TextDirection} from "../../pipes/direction";
import {ShuffleArray} from "../../pipes/shuffle";

const NUM_SUGGESTIONS: number = 10;

@Page({
    templateUrl: 'build/pages/spelling/spelling.html',
    directives: [Letter],
    pipes: [TextDirection, ShuffleArray]
})
export class SpellingPage {

    gameData: any;
    currentWord: any;
    currentIndex:number;
    currentWordSpelling: string[];
    suggestions = [];
    result = [];
    private availableWords = [];
    constructor(private dataService: DataService) {
        this.gameData = dataService.data.games[0];
        this.nextWord();
    }

    nextWord() {
        if (this.availableWords.length === 0) {
            this.availableWords = this.gameData.data.words.slice(0);
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
            let index = Math.floor(Math.random() * Object.keys(this.dataService.data.letters).length);
            fakeLetters[i] = {value:  Object.keys(this.dataService.data.letters)[index], used: false};
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
            //TODO success!!!
            this.result = this.result.map((l, index) => index == this.currentIndex ? letter.value : l);
            letter.used = true;
            this.currentIndex++;
            if (this.currentIndex === this.currentWordSpelling.length) {
                this.onComplete();
            }
        }
        else {
            //TODO fail :(
        }
    }

    onComplete() {
        setTimeout(() => {this.nextWord()}, 1000);
    }

}
