import {Platform, ionicBootstrap} from 'ionic-angular';
import {HomePage} from './pages/home/home';
import {Component} from '@angular/core';

import {HTTP_PROVIDERS} from "@angular/http";
import {StatusBar} from "ionic-native";
import {StaticDataService} from "./services/static-data-service";
import {StorageService} from "./services/storage-service";
import {PlayerDataService} from "./services/player-data-service";


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [StaticDataService, StorageService, PlayerDataService, HTTP_PROVIDERS]
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
ionicBootstrap(MyApp, [], {
    backButtonText: 'חזרה',
        backButtonIcon: 'custom-back',
        mode: 'ios'
});
// http://ionicframework.com/docs/v2/api/config/Config/