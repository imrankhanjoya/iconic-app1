webpackJsonp([32],{

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home__ = __webpack_require__(388);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = (function () {
    function HomePageModule() {
    }
    return HomePageModule;
}());
HomePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__home__["a" /* HomePage */]
        ]
    })
], HomePageModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_mandi_mandi__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_news_news__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_weather_weather__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_krish_krish__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_experts_experts__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_marketpro_marketpro__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_announcementpro_announcementpro__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_call_call__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_api_api__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_youtube_video_player__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
















/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = (function () {
    function HomePage(platform, geolocation, navCtrl, navParams, mandi, news, Announce, krish, weather, experts, market, iab, api, storage, youtube, rd, callProvider) {
        var _this = this;
        this.platform = platform;
        this.geolocation = geolocation;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mandi = mandi;
        this.news = news;
        this.Announce = Announce;
        this.krish = krish;
        this.weather = weather;
        this.experts = experts;
        this.market = market;
        this.iab = iab;
        this.api = api;
        this.storage = storage;
        this.youtube = youtube;
        this.rd = rd;
        this.callProvider = callProvider;
        this.expertdata = { status: 'false', msg: 'test', data: '' };
        this.mandidata = { status: 'false', msg: 'test', data: '' };
        this.mandidata1 = { status: 'false', msg: 'test', data: '' };
        this.mandidata2 = { status: 'false', msg: 'test', data: '' };
        this.newsData = { status: 'false', msg: 'test', data: '' };
        this.kendraData = { status: 'false', msg: 'test', data: '' };
        this.kendraHome = { status: 'false', msg: 'test', data: '' };
        this.wheaterHome = { status: 'false', msg: 'test', data: '' };
        this.productHome = { status: 'false', msg: 'test', data: '' };
        this.announceList = { status: 'false', msg: 'test', data: '' };
        this.geoLoc = { lat: 26.957740, lng: 75.745459 };
        this.topMenu = '';
        //----------------------Hader Animiation Start------
        this.isRun1 = true;
        this.isRun2 = false;
        this.isRun3 = false;
        this.isCount = true;
        this.rotateClass = "";
        storage.get('userData').then(function (userdata) {
            if (userdata) {
                _this.userId = userdata.ID;
                _this.userDisplayName = userdata.display_name;
            }
        });
        storage.get('userStateId').then(function (userdata) {
            _this.userStateId = userdata;
        });
        //this.topMenu = 'toolbarClosed';
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log(resp);
            _this.storage.set('userLoction', resp.coords);
            _this.getkrish(resp.coords.latitude, resp.coords.longitude);
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        this.getMandiData();
        this.getNews();
        this.getweather(127900);
        this.get_expert();
        this.getmarkets();
        this.getannouncement();
    };
    HomePage.prototype.toggleMenu = function () {
        if (this.topMenu == 'toolbarClosed' || this.topMenu == '') {
            this.rotateClass = "rotateimage1";
            this.toolbarClass = "toolbarOpen";
            this.topMenu = "toolbarOpen";
        }
        else {
            console.log(this.rotateClass);
            this.rotateClass = "rotateimage2";
            this.toolbarClass = "toolbarClosed";
            this.topMenu = "toolbarOpen";
            this.topMenu = "toolbarClosed";
        }
    };
    HomePage.prototype.get_expert = function () {
        var _this = this;
        this.experts.Experts_list().map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.expertdata = res;
            console.log(_this.expertdata);
        }, function (err) {
            // Unable to log in
            console.log(err);
        });
    };
    HomePage.prototype.getweather = function (location) {
        var _this = this;
        this.weather.weatheHourly().map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.wheaterHome.data = res.data;
            _this.wheaterHome.msg = res.msg;
            _this.wheaterHome.status = res.status;
            console.log(res.data);
        }, function (err) {
            // Unable to log in
            console.log(err);
        });
    };
    HomePage.prototype.getMandiData = function () {
        var _this = this;
        this.mandi.usermandi(this.userId, this.userStateId).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.mandidata = res.data[0];
            _this.mandidata1 = res.data[1];
            _this.mandidata2 = res.data[2];
            console.log(_this.mandidata.data);
        }, function (err) {
            // Unable to log in
            console.log(err);
        });
    };
    HomePage.prototype.getNews = function () {
        var _this = this;
        this.news.homeNews(3).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.newsData.data = res.data;
            _this.newsData.msg = res.msg;
            _this.newsData.status = res.status;
        }, function (err) {
            // Unable to log in
            console.log(err);
        });
    };
    HomePage.prototype.getmarkets = function () {
        var _this = this;
        this.market.productlist(5).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.productHome.data = res.data;
            _this.productHome.msg = res.msg;
            _this.productHome.status = res.status;
            console.log('market data start');
            console.log(_this.productHome);
        }, function (err) {
            // Unable to log in
            console.log(err);
        });
    };
    HomePage.prototype.getkrish = function (lat, long) {
        var _this = this;
        this.krish.kendraList(lat, long).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.kendraData.data = res.data;
            _this.kendraData.msg = res.msg;
            _this.kendraData.status = res.status;
            _this.kendraHome.data = res.data.results[0];
            console.log(res['data']);
            console.log(res['data'].results);
            _this.geoLoc.lat = res.data.results[0].geometry.location.lat;
            _this.geoLoc.lng = res.data.results[0].geometry.location.lng;
            _this.userKm = _this.krish.getDistanceFromLatLonInKm(_this.geoLoc.lat, _this.geoLoc.lng, lat, long);
            console.log(_this.userKm);
        }, function (err) {
            // Unable to log in
            console.log(err);
        });
    };
    HomePage.prototype.getannouncement = function () {
        var _this = this;
        this.Announce.announcementList(1).map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.announceList.data = res.data;
            _this.announceList.msg = res.msg;
            _this.announceList.status = res.status;
            console.log('Add for Announcement');
            console.log(_this.announceList.data[0].title);
        }, function (err) {
            // Unable to log in
            console.log(err);
        });
    };
    HomePage.prototype.gotoAskquestion = function () {
        this.navCtrl.push('QuestionlistPage');
    };
    HomePage.prototype.gotoWebView = function (URL) {
        console.log("baran" + URL);
        var ref = this.iab.create(URL, '_blank', 'location=yes');
    };
    HomePage.prototype.gotoWeatherPage = function () {
        this.navCtrl.push('WeatherPage');
    };
    HomePage.prototype.gotoservicesPage = function () {
        this.navCtrl.push('ServicesPage');
    };
    HomePage.prototype.goToExpertDetial = function (id) {
        this.navCtrl.push('ExpertsDetailPage', { id: id });
    };
    HomePage.prototype.gotomandiDetail = function () {
        this.navCtrl.push('MandiDetailsPage');
    };
    HomePage.prototype.gotoNewsPage = function () {
        this.navCtrl.push('NewsPage');
    };
    HomePage.prototype.gotoMarketPage = function () {
        this.navCtrl.push('MarketPage');
    };
    HomePage.prototype.gotoVedio = function () {
        this.navCtrl.push('VideoPage');
    };
    HomePage.prototype.gotoRentals = function () {
        this.navCtrl.push('RentalsPage');
    };
    HomePage.prototype.gotoAnounsePage = function () {
        this.navCtrl.push('AnnouncementPage');
    };
    HomePage.prototype.goToBlogPage = function () {
        this.navCtrl.push('CardsPage');
    };
    HomePage.prototype.goToSetting = function () {
        this.navCtrl.push('SettingsPage');
    };
    HomePage.prototype.onScroll = function (ev) {
        if (this.isCount) {
            this.isCount = false;
            this.oneForSize = ev.scrollHeight / 4;
        }
        if (this.isRun1) {
            if (ev.scrollTop >= this.oneForSize) {
                this.changeClass('1');
                this.isRun1 = false;
                this.isRun2 = true;
                this.isRun3 = true;
                //console.log('--------'+JSON.stringify(ev));
            }
        }
        if (this.isRun2) {
            if (ev.scrollTop >= (this.oneForSize * 2)) {
                this.changeClass('2');
                this.isRun2 = false;
                this.isRun1 = false;
                this.isRun3 = true;
            }
        }
        if (this.isRun3) {
            if (ev.scrollTop >= (this.oneForSize * 3)) {
                this.changeClass('3');
                this.isRun2 = false;
                this.isRun1 = false;
                this.isRun3 = true;
            }
        }
    };
    HomePage.prototype.changeClass = function (count) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log('-------------------');
                if (count == '1') {
                    this.rd.addClass(this.elem.nativeElement, 'fadeInLeft');
                    this.rd.removeClass(this.elem.nativeElement, 'opacityGone');
                    return [2 /*return*/, 'datarebjnj'];
                }
                if (count == '2') {
                    this.rd.addClass(this.karsi_id.nativeElement, 'fadeInLeft');
                    this.rd.removeClass(this.karsi_id.nativeElement, 'opacityGone');
                    return [2 /*return*/, 'datarebjnj'];
                }
                if (count == '3') {
                    this.rd.addClass(this.tongl_id.nativeElement, 'fadeInLeft');
                    this.rd.removeClass(this.tongl_id.nativeElement, 'opacityGone');
                    return [2 /*return*/, 'datarebjnj'];
                }
                return [2 /*return*/, 'datarebjnj'];
            });
        });
    };
    //----------------------Hader Animiation End------
    // ngAfterViewInit() {
    //   this.content.ionScroll.subscribe((data)=>{
    //    // console.log(data);
    //     if (data.scrollTop >= 206) {
    //       if(this.isRun){
    //         console.log(this.main_div.nativeElement.offsetHeight);
    //         this.rd.addClass(this.elem.nativeElement, 'fadeInLeft');
    //         this.rd.removeClass(this.elem.nativeElement, 'opacityGone');
    //         this.isRun=false;
    //       }
    //     }
    //   });
    // }
    HomePage.prototype.gotoMap = function (latitude, longitude) {
        console.log(latitude + '---' + longitude + '----');
        if (this.platform.is('android')) {
            //  window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + this.location.latitude + ',' + this.location.longitude + '(' + this.location.name + ')', '_system');
            window.open('geo://' + latitude + ',' + longitude + '?q=' + latitude + ',' + longitude + '(no)', '_system');
        }
        ;
    };
    HomePage.prototype.mackCall = function () {
        this.callProvider.makeCall();
    };
    HomePage.prototype.playVideo = function (videoid) {
        console.log('videoid  : ' + videoid);
        this.youtube.openVideo(videoid);
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('man_id'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "elem", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('karsi_id'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "karsi_id", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('tongl_id'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "tongl_id", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('main_div'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomePage.prototype, "main_div", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], HomePage.prototype, "content", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/private/var/www/my_ionic/agri/src/pages/home/home.html"*/'\n<ion-header no-border>\n<ion-toolbar class="headercolor">\n<button ion-button menuToggle class="menufontcolor">\n<ion-icon name="menu" ></ion-icon>\n</button>\n<ion-buttons end>\n<button ion-button icon-only class="headericon" (click)="gotoSearchProduct()">\n<img src="assets/img/agri bolo icon/hdpi/wallet.png">\n</button>\n</ion-buttons>\n<ion-title>{{\'HELLO\' | translate}}</ion-title>\n<ion-buttons end>\n<button ion-button icon-only class="headericon" (click)="presentPopover($event)">\n  <img src="assets/img/agri bolo icon/hdpi/notification.png">\n</button>\n</ion-buttons>\n<ion-buttons end>\n<button ion-button icon-only class="headericon" (click)="presentPopover($event)">\n  <img src="assets/img/agri bolo icon/hdpi/Fill 31 + Fill 32 + Fill 33.png">\n</button>\n</ion-buttons>\n</ion-toolbar>\n<ion-grid  class="gridView gridDesign">\n  <ion-row class="gridRow">\n    <ion-col class="toolbarCol" (click)="gotoWeatherPage()">\n      <img src="assets/img/agri bolo icon/hdpi/Group 39.png">\n      {{ \'WEATHER\' | translate }}\n    </ion-col>\n    <ion-col #man_id  class="toolbarCol opacityGone"  (click)="gotomandiDetail()">\n      <img class="{{maindiIconClass}}" src="assets/img/agri bolo icon/hdpi/Group 21.png" >\n      {{\'MANDI\' | translate }}\n    </ion-col>\n    <ion-col #karsi_id class="toolbarCol opacityGone" (click)="gotoservicesPage()">\n      <img src="assets/img/agri bolo icon/hdpi/rishi sevna.png">\n      {{\'AGRICULTURAL_SERVICES\' | translate }}\n    </ion-col>\n    <ion-col #tongl_id class="toolbarCol opacityGone">\n      <img (click)="toggleMenu()" class="{{rotateClass}}" src="assets/img/agri bolo icon/hdpi/Group 37.png">\n      {{\'LESS\' | translate }}\n    </ion-col>\n\n  </ion-row>\n  <div class="{{toolbarClass}}" *ngIf="topMenu">\n  <ion-row class="gridRow" >\n\n      <ion-col class="toolbarCol" (click)="gotoAskquestion()">\n        <img src="assets/img/agri bolo icon/hdpi/Group 36.png">\n          {{\'MANAGED\' | translate }}\n      </ion-col>\n      <ion-col class="toolbarCol"(click)="gotoVedio()">\n        <img src="assets/img/agri bolo icon/hdpi/Group 35.png" >\n        {{\'VIDEO\' | translate }}\n      </ion-col>\n      <ion-col class="toolbarCol" (click)="gotoAskquestion()">\n        <img src="assets/img/agri bolo icon/hdpi/Group 31.png">\n        {{\'ASK_THE_EXPERT\' | translate }}\n      </ion-col>\n      <ion-col class="toolbarCol">\n\n      </ion-col>\n\n  </ion-row>\n  </div>\n  </ion-grid>\n</ion-header>\n\n\n<ion-content (ionScroll)="onScroll($event)">\n  <div #main_div >\n\n  <!-------Welcome Promoe------>\n\n  <ion-card class="dialogYellow backgroundColorYellow" *ngIf="announceList.status==true">\n    <ion-grid >\n      <ion-row>\n        <ion-col col-3 >\n          <ion-thumbnail item-start >\n         <img src="assets/img/promo_icon.png" >\n         </ion-thumbnail>\n            </ion-col>\n        <ion-col  col-9>\n        <ion-row >\n        <div class="smallTitle">\n          {{\'HELLO\' | translate}} {{userDisplayName}}\n        </div>\n        </ion-row>\n        <ion-row>\n          <div class="Headline colorBlack fontNormal">\n            {{announceList.data[0].title}}\n          </div>\n        </ion-row>\n\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n  </ion-card>\n\n\n\n<!-----------------Weather section-->\n   <ion-grid>\n      <ion-row>\n      <ion-col class="cardHeader">\n          <div class="headerClass">{{ \'WEATHER\' | translate }}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-card *ngIf="wheaterHome.status==true" (click)="gotoWeatherPage()">\n    <ion-row>\n      <ion-col col-6 class="colCandigare">\n          {{wheaterHome.data.WeatherData[0].DateTime | date:\'dd MMMM yyyy HH:mm a\'}}\n          <div class="main">\n              <div class="elementTitle">{{wheaterHome.data.tehsil_name}}</div>\n              <p class="weathertitle">{{wheaterHome.data.WeatherData[0].tempratureValue}}˚{{wheaterHome.data.WeatherData[0].tempratureUnit}}</p>\n              <div class="elementTitle">{{wheaterHome.data.WeatherData[0].IconPhrase}}</div>\n          </div>\n      </ion-col>\n      <ion-col col-6 class="imageCol">\n          <img  src="{{wheaterHome.data.WeatherData[0].WeatherIconsBig}}"/>\n      </ion-col>\n    </ion-row>\n    <ion-grid>\n\n      <ion-row padding-left >\n        <ion-col col-2 *ngFor="let data of wheaterHome.data.WeatherData;"  class="day-content">\n          <p>{{data.DateTime | date:\'HH a\'}} </p>\n          <img src="{{data.WeatherIconsSmall}}" alt="your image" class="icon">\n          <p>{{data.tempratureValue}}˚{{data.tempratureUnit}}</p>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid>\n    <ion-row class="weatherfoter">\n      <ion-col col-1>\n        <img class="bulb-icon" src="assets/img/agri bolo icon/hdpi/idea.png" alt="your image">\n      </ion-col>\n      <ion-col col-11 class="sources">\n      <div class="Headline colorBlack" >{{\'SUTRA\' | translate}}</div>\n      </ion-col>\n    </ion-row>\n    </ion-grid>\n\n\n  </ion-card>\n<!----End Weather Section-->\n\n<!----Start Mandi Section-->\n\n\n\n\n  <ion-grid>\n      <ion-row>\n      <ion-col class="cardHeader">\n          <div class="headerClass">{{ \'MANDI\' | translate }}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n\n\n\n  <ion-card >\n    <ion-grid  >\n  <ion-row>\n    <ion-col col-3 >\n\n      <img src="{{mandidata.crop_image}}" class="grapImage"/>\n    </ion-col>\n    <ion-col col-9>\n      <div>\n        <div class="MandiTitle">{{mandidata.commodity_name}}</div>\n\n      </div>\n\n      <div class="MandiPrice">₹{{mandidata.max_price}}-{{mandidata.min_price}}</div>\n      <ion-row class="MandiUnit">\n      <div >{{\'PER_QUINTAL\' | translate}} | {{mandidata.arrival_date}}</div>\n      </ion-row>\n    </ion-col>\n\n  </ion-row>\n  <ion-row>\n\n    <iframe style="width: 100%; height: 200px; overflow: hidden; border: none;" src="http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/mandi-map&market_id=792&commodity_id=230"></iframe>\n\n  </ion-row>\n\n  </ion-grid>\n  <ion-grid>\n  <ion-row padding-top class="weatherfoter">\n    <ion-col col-2>\n      <img src="{{mandidata1.crop_image}}" class="grapImage"/>\n\n    </ion-col>\n    <ion-col col-4 class="sepRight">\n      <div class="SmallerMandiTitle">{{mandidata1.commodity_name}}</div>\n      <div class="SmallerMandiPrice">₹{{mandidata1.max_price}}-{{mandidata1.min_price}}</div>\n      <div class="SmallerMandiUnit">{{\'PER_QUINTAL\' | translate}}</div>\n    </ion-col>\n\n    <ion-col col-2>\n      <img src="{{mandidata2.crop_image}}" class="grapImage"/>\n    </ion-col>\n    <ion-col col-4>\n      <div class="SmallerMandiTitle">{{mandidata2.commodity_name}}</div>\n      <div class="SmallerMandiPrice">₹{{mandidata2.max_price}}-{{mandidata2.min_price}}</div>\n      <div class="SmallerMandiUnit">{{\'PER_QUINTAL\' | translate}}</div>\n    </ion-col>\n     <ion-col>\n\n      <div class="alignCenter">\n        <button ion-button  class="buttonGreen"  (click)="gotomandiDetail()">{{\'SEE_MORE\' | translate}}</button>\n    </div>\n\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n  </ion-row>\n\n  </ion-grid>\n  </ion-card>\n\n  <!---*******\n        Experts Section\n                        ******-->\n\n\n  <ion-grid>\n      <ion-row>\n      <ion-col class="cardHeader">\n          <div class="headerClass">{{\'SPECIALIST\'| translate}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n   <ion-slides  [slidesPerView]="\'auto\'" >\n\n        <ion-slide   *ngFor=" let expert of expertdata.data, let i = index " >\n              <ion-card class="image-card" >\n                <img src="{{expert.attachments}}" >\n                <div class="card-title-box">\n                <div class="card-title fontBold smallTitle fontShadow">{{expert.title}}</div>\n                <div class="card-subtitle fontBold captionFont">{{expert.date}}</div>\n\n                <button ion-button color="light" (click)=" goToExpertDetial(expert.id)" outline>{{\'SEE_MORE\'| translate}}</button>\n                </div>\n              </ion-card>\n\n          </ion-slide>\n          <ion-slide  >\n              <ion-card  >\n                <div class="see-title-box">\n                <button ion-button color="light" (click)="goToBlogPage()" outline>{{\'SEE_MORE\'| translate}}</button>\n                </div>\n              </ion-card>\n          </ion-slide>\n\n   </ion-slides>\n\n\n\n  <ion-grid>\n      <ion-row>\n      <ion-col class="cardHeader">\n          <div class="headerClass">{{\'NEWS\'| translate}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-card>\n      <div class="row separator" *ngIf="newsData.status==true" (click)="gotoWebView(newsData.data[0].link)">\n      <img  src="{{newsData.data[0].image}}" class="newsLargeImage"/>\n      <div padding-top padding-left class="newsLargeTitle">{{newsData.data[0].title}}</div>\n      <div padding-left class="newsLargePTI">{{\'PTI_AND_UPDATE\' | translate}} : {{newsData.data[0].created}}</div>\n    </div>\n  <ion-grid >\n    <ion-row padding-top class="separator" *ngFor=" let news of newsData.data, let i = index "  (click)="gotoWebView(newsData.data[i].link)">\n      <ion-col col-3 *ngIf="i > 0 ">\n        <img class = "newsSmallImage roundImage" src="{{news.image}}" width="200px" />\n      </ion-col>\n      <ion-col col-9 class="newsSmallBlock" *ngIf="i > 0 ">\n        <div >{{news.title}}</div>\n        <div class="newsSmallPTI">{{\'PTI_AND_UPDATE\' | translate}}  : Jun 12, 2017, 05:44PM IST</div>\n      </ion-col>\n    </ion-row>\n\n    <div class="alignCenter">\n      <button ion-button  class="buttonGreen"  (click)="gotoNewsPage()">{{\'SEE_MORE\' | translate}} </button>\n    </div>\n\n\n\n  </ion-grid>\n  </ion-card>\n\n<!------Start Product Sectoipn---->\n\n\n  <ion-grid>\n      <ion-row>\n      <ion-col class="cardHeader">\n          <div class="headerClass">{{\'MARKET\'| translate}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n  <ion-slides [slidesPerView]="\'auto\'">\n    <ion-slide class="slideItem"  *ngFor="let productData of productHome.data;">\n      <ion-card>\n        <img class="produtimage" src="{{productData.feature_image}}"/>\n        <div class="sarsTitle colorGrey Headline">{{productData.name}}</div>\n        <div class="detailSar colorGreen smallTitle" (click)="mackCall()"> {{\'VALUE_ON_REQUEST\' | translate}}</div>\n      </ion-card>\n    </ion-slide>\n    <ion-slide class="slideItem ">\n      <ion-card>\n          <div class="see-title-box">\n          <button ion-button color="light" (click)="gotoMarketPage()" outline>{{\'SEE_MORE\'| translate}}</button>\n          </div>\n      </ion-card>\n\n  </ion-slide>\n  </ion-slides>\n\n  <!-------END Product Sectopn------>\n\n  <ion-card class="dialog" *ngIf="announceList.status==true">\n    <ion-grid >\n      <ion-row>\n        <ion-col col-3 >\n          <ion-thumbnail item-start class="avatar">\n         <img src="assets/img/watring_can/drawable-hdpi/watering_can.png" >\n         </ion-thumbnail>\n            </ion-col>\n        <ion-col class="smallTitle" col-9>\n          {{announceList.data[0].title}}\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <div class="readMore titleFont" (click)="gotoAnounsePage()">{{\'SEE_MORE\' | translate}}</div>\n  </ion-card>\n\n\n\n <!---*******\n        Experts Section\n                        ******-->\n\n\n  <ion-grid>\n      <ion-row>\n      <ion-col class="krishisevayen-cardHeader">\n          <div class="headerClass">{{\'AGRO_SERVICES\'| translate}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n   <ion-slides  [slidesPerView]="\'1.05\'" >\n\n                <ion-slide>\n              <ion-card class="image-card" >\n                <img src="assets/img/askquestion.jpg" >\n                <div class="krishisevayen-title-box">\n                <div class="krishisevayen-title fontBold displayThreeFont fontShadow alignCenter">{{\'ASK_THE_EXPERT\'| translate}}</div>\n                <button ion-button >{{\'ASK_EXPERT_SUBTILE\'| translate}}</button>\n\n                </div>\n              </ion-card>\n              </ion-slide>\n\n              <ion-slide>\n              <ion-card class="image-card" >\n                <img src="assets/img/Kharif.jpeg" >\n                <div class="krishisevayen-title-box">\n                <div class="krishisevayen-title fontBold displayThreeFont fontShadow alignCenter">{{\'CROP\'| translate}}</div>\n                <button ion-button >{{\'GET_MORE_INSIGHT\'| translate}}</button>\n\n                </div>\n              </ion-card>\n\n              </ion-slide>\n\n              <ion-slide>\n              <ion-card class="image-card" >\n                <img src="assets/img/horticulture.jpeg" >\n                <div class="krishisevayen-title-box">\n                <div class="krishisevayen-title fontBold displayThreeFont fontShadow alignCenter">{{\'HORTICULTURE\'| translate}}</div>\n                <button ion-button >{{\'GET_MORE_INSIGHT\'| translate}}</button>\n\n                </div>\n              </ion-card>\n\n              </ion-slide>\n\n          <ion-slide  >\n              <ion-card  >\n                <div class="see-title-box">\n                <button ion-button color="light" (click)="goToBlogPage()" outline>{{\'SEE_MORE\'| translate}}</button>\n                </div>\n              </ion-card>\n          </ion-slide>\n\n   </ion-slides>\n\n\n\n\n\n\n\n\n  <ion-grid>\n      <ion-row>\n      <ion-col class="cardHeader">\n          <div class="headerClass">{{\'VIDEO\'| translate}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-card class="vedioCard">\n  <ion-row><img class="roundImage fitImage" (click)="playVideo(\'Moin-yDG7Ss\')" src="https://img.youtube.com/vi/Moin-yDG7Ss/0.jpg" ></ion-row>\n  <div>\n    <div class="paddingTop paddingLeft paddingBottom newsLargeTitle">Agribolo : Agriculture on the finger tips of Indian farmer\n    </div>\n    <div class="alignCenter">\n      <button ion-button  class="buttonGreen"  (click)="gotoVedio()">{{\'SEE_MORE\' | translate}}</button>\n    </div>\n\n  </div>\n\n\n  </ion-card >\n\n\n\n  <ion-grid>\n      <ion-row>\n      <ion-col class="cardHeader">\n          <div class="headerClass">{{\'AGRICULTURAL_CENTER\'| translate}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n\n  <ion-card >\n  <img src="https://maps.googleapis.com/maps/api/staticmap?center={{geoLoc.lat}},{{geoLoc.lng}}&zoom=16&size=400x400&markers=color:green%7Clabel:k%7C{{geoLoc.lat}},{{geoLoc.lng}}&key=AIzaSyDyovCt6Vv3pefuZ0JdQC9caXFg3NNf2R0">\n\n  <ion-grid>\n      <ion-row>\n      <ion-col >\n          <p>कृषि केंद्र {{userKm}} किमी दूर है।</p>\n      </ion-col>\n      <ion-col >\n          <button ion-button small class="button" padding-left padding-right (click)="gotoMap(geoLoc.lat,geoLoc.lng)" >{{\'HOME_GOTO_LUCTION\' | translate}}</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n\n  </ion-card >\n\n\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/private/var/www/my_ionic/agri/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_mandi_mandi__["a" /* MandiProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_news_news__["a" /* NewsProvider */], __WEBPACK_IMPORTED_MODULE_10__providers_announcementpro_announcementpro__["a" /* AnnouncementproProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_krish_krish__["a" /* KrishProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_weather_weather__["a" /* WeatherProvider */],
        __WEBPACK_IMPORTED_MODULE_6__providers_experts_experts__["a" /* ExpertsProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_marketpro_marketpro__["a" /* MarketproProvider */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_12__providers_api_api__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_11__providers_call_call__["a" /* CallProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=32.js.map