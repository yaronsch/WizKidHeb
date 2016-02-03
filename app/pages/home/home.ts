import {Page} from 'ionic-framework/ionic';
import {NavController} from 'ionic-framework/components/nav/nav-controller'
import {DataService} from '../../services/data-service'

@Page({
    templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
    private nav: NavController;
    constructor(private nav: NavController, private dataService: DataService) {

    }
}
