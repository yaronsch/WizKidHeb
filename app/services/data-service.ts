import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
declare var fetch;

@Injectable()
export class DataService {
    public data: any;
    constructor(private http: Http) {
        http.get('build/config/config.json').subscribe(data => {
            this.data = data.json();
        });
    }

}
