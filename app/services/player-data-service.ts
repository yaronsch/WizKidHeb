import {Injectable} from "angular2/core";
import {StorageService} from "./storage-service";

@Injectable()
export class PlayerDataService {
    private data:any;
    private category: number;
    private game: number;
    
    constructor(private storageService: StorageService) {}
        
    setGameData(category: number, game: number) {
        this.category = category;
        this.game = game;
        this.data = this.storageService.getGameData(category, game);
    }
    
    public get level(): number {
        return this.data.level;
    }
    
    public set level(value: number) {
        this.data.level = value;
        this.storageService.setGameData(this.category, this.game, this.data);
    }
}