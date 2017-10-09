import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
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

//plugns..
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { CallNumber } from '@ionic-native/call-number';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { CropsProvider } from '../providers/crops/crops';
import { CroplistProvider } from '../providers/croplist/croplist';
import { CroptyeProvider } from '../providers/croptye/croptye';
import { CallProvider } from '../providers/call/call';


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
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    GoogleMaps,
    Geolocation,
    SplashScreen,
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
    YoutubeVideoPlayer,
    AnnouncementproProvider,
    CallNumber,
    Camera,
    NativeGeocoder,
    CropsProvider,
    CroplistProvider,
    CroptyeProvider,
    CallProvider
  ]
})
export class AppModule { }
