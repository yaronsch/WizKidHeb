import {Injectable} from "@angular/core";
import {SqlStorage, Storage} from "ionic-angular";

const DB_NAME = "wizkid_storage";
@Injectable()
export class StorageService {
    storage: Storage;
    public data: any;

    constructor() {
        this.storage = new Storage(SqlStorage, {name: DB_NAME});
        this.storage.get('data').then(data => {
            if (data) {
                this.data = JSON.parse(data);
            }
            else {
                this.data = {};
            }
        });
    }

    getGameData(category: number, game: number): any {
        if (!this.data[category] || !this.data[category][game]) {
            return {level: 1, points: 0};
        }
        else {
            return this.data[category][game];
        }
    }

    setGameData(category: number, game: number, data: any) {
        if (!this.data[category]) {
            this.data[category] = {};
        }
        if (!this.data[category][game]) {
            this.data[category][game] = {};
        }
        this.data[category][game] = data;
        this.storage.set('data', JSON.stringify(this.data));
    }
}