import {Injectable} from "angular2/core";
import {Http} from "angular2/http";

@Injectable()
export class StaticDataService {
    public data: any;
    constructor(private http: Http) {
        http.get('build/config/config.json').subscribe(data => {
            this.data = data.json();
        });
    }

}
