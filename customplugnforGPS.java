package uk.co.whiteoctober.cordova;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import android.util.Log;

public class AppVersion extends CordovaPlugin {
  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

    try {
      if (action.equals("getAppName")) {
        PackageManager packageManager = this.cordova.getActivity().getPackageManager();
        ApplicationInfo app = packageManager.getApplicationInfo(this.cordova.getActivity().getPackageName(), 0);
        callbackContext.success((String)packageManager.getApplicationLabel(app));
        return true;
      }
      if (action.equals("getPackageName")) {
        final LocationManager manager = (LocationManager) this.cordova.getActivity().getSystemService( Context.LOCATION_SERVICE );
        String isGPS="false";
        if ( !manager.isProviderEnabled( LocationManager.GPS_PROVIDER ) ) {
          isGPS="false";
          this.cordova.getActivity().startActivityForResult(new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS), 200);

        }else {
          isGPS="true";
        }
        Log.e("-----------------------",""+isGPS);
        callbackContext.success(isGPS);
        return true;
      }
      if (action.equals("getVersionNumber")) {
        PackageManager packageManager = this.cordova.getActivity().getPackageManager();
        callbackContext.success(packageManager.getPackageInfo(this.cordova.getActivity().getPackageName(), 0).versionName);
      return true;
      }
      if (action.equals("getVersionCode")) {
        PackageManager packageManager = this.cordova.getActivity().getPackageManager();
        callbackContext.success(packageManager.getPackageInfo(this.cordova.getActivity().getPackageName(), 0).versionCode);
      return true;
      }
      return false;
    } catch (NameNotFoundException e) {
      callbackContext.success("N/A");
      return true;
    }
  }

}
