import {Page} from 'ionic-framework/ionic';
import {Input} from "angular2/core";
import {DataService} from "../../services/data-service";
import {Letter} from "../../components/letter/letter";
import {TextDirection} from "../../pipes/direction";

@Page({
    templateUrl: 'build/pages/spelling/spelling.html',
    directives: [Letter],
    pipes: [TextDirection]
})
export class SpellingPage {
    gameData: any;
    currentWord: any;
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

        this.result = new Array(this.currentWord.spelling.length).map(item => "");
    }
}
