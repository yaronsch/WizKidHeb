import {Injectable} from "angular2/core";
declare var fetch;

@Injectable()
export class DataService {
    public data: any;
    constructor() {
        fetch('build/config/config.json').then(conf => conf.json()).then(data => {
            this.data = data;
        });
    }

}
