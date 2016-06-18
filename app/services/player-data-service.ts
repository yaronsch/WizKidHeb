import {Injectable} from "@angular/core";
import {StorageService} from "./storage-service";

const MAX_LEVEL = 3;
const MIN_LEVEL = 1;

@Injectable()
export class PlayerDataService {
    private data:any;
    private category: number;
    private game: number;
    private levelsThresholds: number[];
    
    constructor(private storageService: StorageService) {}
        
    setGameData(category: number, game: number, levelsThresholds: number[]) {
        this.category = category;
        this.game = game;
        this.data = this.storageService.getGameData(category, game);
        if (!this.data) {
            this.data = {level: 1, points: 0, levelsCleared:[]};
        }
        this.levelsThresholds = levelsThresholds;
    }
    
    public get level(): number {
        return this.data.level;
    }
    
    public get points(): number {
        return this.data.points;
    }
    
    public set level(value: number) {
        this.data.level = value;
        this.storeData();
    }
       
    public addPoints(points: number = 1): boolean {
        let prevPoints = this.points;
        let levelChanged: boolean = false;
        this.data.points += points;
        if (this.data.points < 0) {
            this.data.points = 0;
        }
        if ((prevPoints < this.levelsThresholds[0] && this.data.points >= this.levelsThresholds[0]) || 
            (prevPoints < this.levelsThresholds[1] && this.data.points >= this.levelsThresholds[1])) {
            levelChanged = this.levelUp();
        }
        if ((prevPoints >= this.levelsThresholds[0] && this.data.points < this.levelsThresholds[0]) ||
            (prevPoints >= this.levelsThresholds[1] && this.data.points < this.levelsThresholds[1])) {
            levelChanged = this.levelDown();
        }
        this.storeData();
        return levelChanged;
    }

    private levelUp(): boolean {
        if (this.data.levelsCleared.indexOf(this.level) === -1 && this.level < MAX_LEVEL) {
            this.data.levelsCleared.push(this.level);
            this.level++;
            return true;
        }
        return false;
    }

    private levelDown(): boolean {
        if (this.data.levelsCleared.indexOf(this.level) === -1 && this.level > MIN_LEVEL) {
            this.level--;
            return true;
        }
        return false;
    }

    private storeData() {
        this.storageService.setGameData(this.category, this.game, this.data);
    }
}