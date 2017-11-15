import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { NewsProvider } from '../providers/news/news';
import { MandiProvider } from '../providers/mandi/mandi';
import { KrishProvider } from '../providers/krish/krish';
import { QuestionsProvider } from '../providers/questions/questions';
import { WeatherProvider } from '../providers/weather/weather';
import { ChoupalProvider } from '../providers/choupal/choupal';
import { CityStateProvider } from '../providers/city-state/city-state';
import { UsermandiProvider } from '../providers/usermandi/usermandi';
import { ExpertproviderProvider } from '../providers/expertprovider/expertprovider';
import { QuitionviewpProvider } from '../providers/quitionviewp/quitionviewp';
import { QuitionanswerpProvider } from '../providers/quitionanswerp/quitionanswerp';
import { MarketproProvider } from '../providers/marketpro/marketpro';
import { ServiceProvider } from '../providers/service/service';
import { KrishCenterProvider } from '../providers/krish-center/krish-center';
import { VideoProvider } from '../providers/video/video';
import { ExpertsProvider } from '../providers/experts/experts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RentalsProvider } from '../providers/rentals/rentals';
import { AnnouncementproProvider } from '../providers/announcementpro/announcementpro';
import { HomePage } from '../pages/home/home';
import { MandiDetailsPage } from '../pages/mandi-details/mandi-details';
import { WeatherPage } from '../pages/weather/weather';

//plugns..


import { Camera, CameraOptions } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { CropsProvider } from '../providers/crops/crops';
import { CroplistProvider } from '../providers/croplist/croplist';
import { CroptyeProvider } from '../providers/croptye/croptye';
import { CallProvider } from '../providers/call/call';
import { ChartsModule } from 'ng2-charts';
import { TabProvider } from '../providers/tab/tab';
import { Firebase } from '@ionic-native/firebase';
import { Deeplinks } from '@ionic-native/deeplinks';
import { ContactusProvider } from '../providers/contactus/contactus';
import { WalletProvider } from '../providers/wallet/wallet';
import { FCM } from '@ionic-native/fcm';
import { CacheModule } from "ionic-cache";
import { SearchProvider } from '../providers/search/search';
import { ETirdingProvider } from '../providers/e-tirding/e-tirding';
import { EtradingProvider } from '../providers/etrading/etrading';


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MandiDetailsPage,
    WeatherPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MandiDetailsPage,
    WeatherPage
  ],
  providers: [
    Api,
    Items,
    User,
    GoogleMaps,
    Geolocation,
    
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NewsProvider,
    MandiProvider,
    KrishProvider,
    QuestionsProvider,
    WeatherProvider,
    ChoupalProvider,
    CityStateProvider,
    UsermandiProvider,
    ExpertproviderProvider,
    QuitionviewpProvider,
    QuitionanswerpProvider,
    MarketproProvider,
    ServiceProvider,
    KrishCenterProvider,
    VideoProvider,
    InAppBrowser,
    ExpertsProvider,
    RentalsProvider,
    
    AnnouncementproProvider,
    Camera,
    AndroidPermissions,
    NativeGeocoder,
    CropsProvider,
    CroplistProvider,
    CroptyeProvider,
    CallProvider,
    TabProvider,
    Firebase,
    Deeplinks,
    ContactusProvider,
    WalletProvider,
    FCM,
    SearchProvider,
    ETirdingProvider,
    EtradingProvider,

  ]
})
export class AppModule { }
