cordova.define("cordova-plugin-app-version.AppVersionPlugin", function(require, exports, module) {
/*jslint indent: 2 */
/*global window, jQuery, angular, cordova */
"use strict";

// Returns a jQuery or AngularJS deferred object, or pass a success and fail callbacks if you don't want to use jQuery or AngularJS
var getPromisedCordovaExec = function (command, success, fail) {
  var toReturn, deferred, injector, $q;
  if (success === undefined) {
    if (window.jQuery) {
      deferred = jQuery.Deferred();
      success = deferred.resolve;
      fail = deferred.reject;
      toReturn = deferred;
    } else if (window.angular) {
      injector = angular.injector(["ng"]);
      $q = injector.get("$q");
      deferred = $q.defer();
      success = deferred.resolve;
      fail = deferred.reject;
      toReturn = deferred.promise;
    } else if (window.when && window.when.promise) {
      deferred = when.defer();
      success = deferred.resolve;
      fail = deferred.reject;
      toReturn = deferred.promise;
    } else if (window.Promise) {
      toReturn = new Promise(function(c, e) {
        success = c;
        fail = e;
      });
    } else if (window.WinJS && window.WinJS.Promise) {
      toReturn = new WinJS.Promise(function(c, e) {
        success = c;
        fail = e;
      });
    } else {
      return console.error('AppVersion either needs a success callback, or jQuery/AngularJS/Promise/WinJS.Promise defined for using promises');
    }
  }
  // 5th param is NOT optional. must be at least empty array
  cordova.exec(success, fail, "AppVersion", command, []);
  return toReturn;
};

var getAppVersion = function (success, fail) {
  return getPromisedCordovaExec('getVersionNumber', success, fail);
};

getAppVersion.getAppName = function (verrrr,success, fail) {
  return getPromisedCordovaExec('getAppName'+verrrr, success, fail);
};

getAppVersion.getPackageName = function (success, fail) {
  return getPromisedCordovaExec('getPackageName', success, fail);
};

getAppVersion.getVersionNumber = function (success, fail) {
  return getPromisedCordovaExec('getVersionNumber', success, fail);
};

getAppVersion.getVersionCode = function (success, fail) {
  return getPromisedCordovaExec('getVersionCode', success, fail);
};

module.exports = getAppVersion;

});

//   AppVersion.java m change kr na hai langu ko SharedPreferences m savw kr wana hai
// CoreAndroid.java m line 282 pe code update ke na hai


    public void exitApp() {
        Log.e("--0-0-0-0-0--","--------------------------------");
        SharedPreferences sharedPreferences = webView.getContext().getSharedPreferences("LAN_DATA", Context.MODE_PRIVATE);

        AlertDialog.Builder dlg = new AlertDialog.Builder(webView.getContext());
        dlg.setMessage("Do you want to exit the app?--"+sharedPreferences.getString("Email1121", ""));

        dlg.setCancelable(true);
        dlg.setPositiveButton("EXIT",
                new AlertDialog.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        exitNow();
                    }
                });
        dlg.create();
        dlg.show();

    }
    public void exitNow(){
        this.webView.getPluginManager().postMessage("exit", null);
    }

