import {Page, NavController} from 'ionic-angular';
import {ShuffleArray} from "../../../pipes/shuffle";
import {DataService} from "../../../services/data-service";
import {Number} from "../../../components/number/number";
import {Hud} from "../../../components/hud/hud";


const MAX: number = 50;
const ITEMS_IN_ROW = 10;
const NUM_ROWS = 6;
const MIN_MAX_RATIO: number = 0.4;
const NUM_SUGGESTIONS: number = 4;

@Page({
    templateUrl: 'build/pages/math/counting/counting.html',
    directives: [Number, Hud],
    pipes: [ShuffleArray]
})
export class CountingPage {
    gameData: any;
    max: number = 5;
    min: number = 2;
    picture: string;
    result: number;
    matrix: boolean[][];
    suggestions: string[];

    constructor(private dataService: DataService, private nav: NavController) {
        this.gameData = dataService.data.menu[1].games[0];
        this.nextExercise();
    }

    nextExercise() {
        this.generateExercise();
        this.generateSuggestions();
    }

    generateExercise() {
        //target             
        this.result = Math.ceil(Math.random() * (this.max - this.min)) + this.min;
        //image
        let index = Math.floor(Math.random() * this.gameData.data.items.length);
        this.picture = this.gameData.data.items[index];
        //matrix
        this.generateMatrix();
    }

    generateMatrix() {
        let mat = [];
        for (let i=0; i<NUM_ROWS; i++) {
            let row = [];
            for (let j=0; j<ITEMS_IN_ROW; j++) {
                row.push(this.result < NUM_ROWS*ITEMS_IN_ROW/2 ? false : true);
            }
            mat.push(row);
        }
        if (this.result < NUM_ROWS*ITEMS_IN_ROW/2) {
            for (let i=0; i<this.result; i++) {
                this.markUnusedSpot(mat, false);
            }
        }
        else {
            for (let i=NUM_ROWS*ITEMS_IN_ROW; i>this.result; i--) {
                this.markUnusedSpot(mat, true);
            }
        }
        this.matrix = mat;
    }

    markUnusedSpot(matrix: boolean[][], emptyValue:boolean) {
        let i = Math.floor(Math.random() * NUM_ROWS);
        let j = Math.floor(Math.random() * ITEMS_IN_ROW);
        while (matrix[i][j] !== emptyValue) {
            i = Math.floor(Math.random() * NUM_ROWS);
            j = Math.floor(Math.random() * ITEMS_IN_ROW);
        }
        matrix[i][j] = !emptyValue;
    }

    generateSuggestions() {
        let tempSuggestions: number[] = [this.result];
        for (let i=0; i<NUM_SUGGESTIONS-1; i++) {
            let suggestion = Math.ceil(Math.random() * this.max + 5);
            while (tempSuggestions.indexOf(suggestion) !== -1) {
                suggestion = Math.ceil(Math.random() * this.max + 5);
            }
            tempSuggestions.push(suggestion);
        }
        this.suggestions = tempSuggestions.map(item => item.toString());

    }

    numberClicked(event, num) {
        if (num == this.result) {
            //TODO success

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
        setTimeout(() => {this.nextExercise();}, 1000);
    }
}
