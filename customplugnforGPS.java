

//-------------------------------------AppVersion.java-------------------------
package uk.co.whiteoctober.cordova;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import android.util.Log;

public class AppVersion extends CordovaPlugin {
  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

    try {
      if (action.contains("getAppName--")) {
//        PackageManager packageManager = this.cordova.getActivity().getPackageManager();
//        ApplicationInfo app = packageManager.getApplicationInfo(this.cordova.getActivity().getPackageName(), 0);
//        callbackContext.success((String)packageManager.getApplicationLabel(app));
        SharedPreferences sharedPreferences = this.cordova.getActivity().getSharedPreferences("LANG_DATA", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("select_lang", action);
        editor.commit();
        return true;
      }
      if (action.equals("getPackageName")) {
        final LocationManager manager = (LocationManager) this.cordova.getActivity().getSystemService( Context.LOCATION_SERVICE );
        String isGPS="false";
        if ( !manager.isProviderEnabled( LocationManager.GPS_PROVIDER ) ) {
          isGPS="false";
        }else {
          isGPS="true";
        }
        Log.e("-----------------------",""+isGPS);
        callbackContext.success(isGPS);
        return true;
      }
      if (action.equals("getVersionNumber")) {
        this.cordova.getActivity().startActivityForResult(new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS), 200);
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
//--------------------------------------------------------------

//-------------------------------------CoreAndroid.java-------------------------
 // public void exitApp() {
 //        String alerMessage="";
 //        String alerExit="";
 //        String alerCancle="";

 //        SharedPreferences sharedPreferences = webView.getContext().getSharedPreferences("LANG_DATA", Context.MODE_PRIVATE);
 //        if (sharedPreferences.getString("select_lang", "").contains("----hi")){
 //            alerMessage="क्या आप ऐप से बाहर निकलना चाहते हैं?";
 //            alerExit="बाहर";
 //            alerCancle="रद्द करना";
 //        }else {
 //            alerMessage="Do you want to exit the app?";
 //            alerExit="EXIT";
 //            alerCancle="CANCEL";
 //        }
 //        AlertDialog.Builder dlg = new AlertDialog.Builder(webView.getContext());
 //        dlg.setMessage(alerMessage);

 //        dlg.setCancelable(true);
 //        dlg.setPositiveButton(alerExit,
 //                new AlertDialog.OnClickListener() {
 //                    public void onClick(DialogInterface dialog, int which) {
 //                        dialog.dismiss();
 //                        exitNow();
 //                    }
 //                });
 //        dlg.setNegativeButton(alerCancle,
 //                new AlertDialog.OnClickListener() {
 //                    public void onClick(DialogInterface dialog, int which) {
 //                        dialog.dismiss();

 //                    }
 //                });
 //        dlg.create();
 //        dlg.show();

 //    }
 //    public void exitNow(){
 //        this.webView.getPluginManager().postMessage("exit", null);
 //    }
//--------------------------------------------------------------











