import {Page} from 'ionic-framework/ionic';
import {Input} from "angular2/core";
import {DataService} from "../../services/data-service";
import {Letter} from "../../components/letter/letter";
import {TextDirection} from "../../pipes/direction";

const NUM_SUGGESTIONS: number = 10;

@Page({
    templateUrl: 'build/pages/spelling/spelling.html',
    directives: [Letter],
    pipes: [TextDirection]
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
        this.currentWord = this.availableWords[wordIndex];
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

        this.suggestions = this.shuffle(this.currentWordSpelling.map(l => {
            return {value: l, used: false};
        }).concat(fakeLetters));
    }

    letterClicked(event, letter) {
        if (letter.used) {
            return;
        }
        debugger;
        if (letter.value === this.currentWordSpelling[this.currentIndex]) {
            //TODO success!!!
            this.result = this.result.map((l, index) => index == this.currentIndex ? letter.value : l);
            letter.used = true;
            this.currentIndex++;
        }


    }

    shuffle(array: any[]) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}
