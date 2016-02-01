import {Page} from 'ionic-framework/ionic';
import {NavController} from 'ionic-framework/components/nav/nav-controller'

@Page({
    templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
    private nav: NavController;
    constructor(nav: NavController) {
        this.nav = nav;
    }
}
