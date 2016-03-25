import {App, Platform} from 'ionic-angular';
import {HomePage} from './pages/home/home';
import {DataService} from './services/data-service';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html

import {HTTP_PROVIDERS} from "angular2/http";
import {StatusBar} from "ionic-native";


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [DataService, HTTP_PROVIDERS],
  config: {
    backButtonText: 'חזרה',
    backButtonIcon: 'custom-back',
    mode: 'ios'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
