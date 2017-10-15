webpackJsonp([7],{

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsPageModule", function() { return TabsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs__ = __webpack_require__(413);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var TabsPageModule = (function () {
    function TabsPageModule() {
    }
    return TabsPageModule;
}());
TabsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__tabs__["a" /* TabsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__tabs__["a" /* TabsPage */]),
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__tabs__["a" /* TabsPage */]
        ]
    })
], TabsPageModule);

//# sourceMappingURL=tabs.module.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TabsPage = (function () {
    function TabsPage(translate, navCtrl, translateService) {
        var _this = this;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.translateService = translateService;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__pages__["c" /* Tab1Root */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__pages__["d" /* Tab2Root */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__pages__["e" /* Tab3Root */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_3__pages__["f" /* Tab4Root */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_3__pages__["g" /* Tab5Root */];
        this.tab1Title = "";
        this.tab2Title = " ";
        this.tab3Title = " ";
        this.tab4Title = " ";
        this.tab5Title = " ";
        this.initTranslate();
        translateService.get(['Home', 'Krishi Center', 'News', 'Choupal', 'Market']).subscribe(function (values) {
            _this.tab1Title = values['Home'];
            _this.tab2Title = values['Krishi Center'];
            _this.tab3Title = values['News'];
            _this.tab4Title = values['Choupal'];
            _this.tab5Title = values['Market'];
        });
    }
    TabsPage.prototype.initTranslate = function () {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('hi');
        if (this.translate.getBrowserLang() !== undefined) {
            //this.translate.use(this.translate.getBrowserLang());
            this.translate.use('hi');
        }
        else {
            this.translate.use('hi'); // Set your language here
        }
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tabs',template:/*ion-inline-start:"/private/var/www/my_ionic/agri/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="{{\'TABS_HOME\' | translate}}" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="{{\'AGRICULTURAL_CENTER\' | translate}}" tabIcon="md-analytics"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="{{\'NEWS\' | translate}}" tabIcon="ios-globe"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="{{\'CHOPAL\' | translate}}" tabIcon="ios-contacts"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="{{\'MARKET\' | translate}}" tabIcon="ios-cart"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/private/var/www/my_ionic/agri/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ })

});
//# sourceMappingURL=7.js.map