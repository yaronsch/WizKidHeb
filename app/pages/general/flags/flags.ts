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
    suggestions: any[];
    availableCountries: any[] = [];

    constructor(private staticDataService: StaticDataService) {
        this.gameData = staticDataService.data.menu[CATEGORY].games[GAME];        
        this.nextExercise();
    }

    nextExercise() {
        if (this.availableCountries.length === 0) {
            this.availableCountries = this.gameData.data.flags.slice(0);
        }
        let index = Math.floor(Math.random() * this.availableCountries.length);
        this.country = this.availableCountries.splice(index, 1)[0];
        this.generateSuggestions();
    }

    generateSuggestions() {
        let suggestions = [this.country];
        while (suggestions.length < NUM_SUGGESTIONS) {
            let index = Math.floor(Math.random() * this.gameData.data.flags.length);
            let suggestion: any = this.gameData.data.flags[index];
            while (suggestions.find(item => item.name === suggestion.name)) {
                index = Math.floor(Math.random() * this.gameData.data.flags.length);
                suggestion = this.gameData.data.flags[index];
            }
            suggestions.push(Object.assign({}, suggestion));
        }
        this.suggestions = suggestions;
    }

    itemClicked(suggestion) {
        if (suggestion.name === this.country.name) {
            //TODO success
            setTimeout(() => {
                this.nextExercise();
            }, 1000)
        }
        else {
            //TODO fail
            suggestion.used = true;
        }
    }
}
