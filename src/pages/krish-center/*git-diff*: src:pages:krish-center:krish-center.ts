diff --git a/src/pages/krish-center/krish-center.ts b/src/pages/krish-center/krish-center.ts
index a132bde..61ed7d2 100644
--- a/src/pages/krish-center/krish-center.ts
+++ b/src/pages/krish-center/krish-center.ts
@@ -41,24 +41,35 @@ export class KrishCenterPage {
           this.locationAlert();
           this.getkrish(26.957740,75.745459);
         }
-      },5000);
+      },10000);
   }
 
 
   ionViewDidLoad() {
-      this.geolocation.getCurrentPosition().then((resp) => {
-       console.log(resp.coords.latitude+" : "+resp.coords.longitude);
-       if (!this.isGetLocation) {
-          this.getkrish(resp.coords.latitude,resp.coords.longitude);
-       }
-    }).catch((error) => {
-      console.log('Error getting location----', error);
-      if (!this.isGetLocation) {
-          this.locationAlert();
-          this.getkrish(26.957740,75.745459);
-        }
+    //   this.geolocation.getCurrentPosition().then((resp) => {
+    //    console.log(resp.coords.latitude+" : "+resp.coords.longitude);
+    //    if (!this.isGetLocation) {
+    //       this.getkrish(resp.coords.latitude,resp.coords.longitude);
+    //    }
+    // }).catch((error) => {
+    //   console.log('Error getting location----', error);
+    //   if (!this.isGetLocation) {
+    //       this.locationAlert();
+    //       this.getkrish(26.957740,75.745459);
+    //     }
 
-    });
+    // });
+    let watch = this.geolocation.watchPosition();
+      watch.subscribe((data) => {
+          watch.unsubscribe();
+          console.log(data.coords.latitude+" --:-- "+data.coords.longitude);
+          if (!this.isGetLocation) {
+            this.getkrish(data.coords.latitude,data.coords.longitude);
+          }
+      });
+      
+      // To stop notifications
+      
      console.log('ionViewDidLoad KrishCenterPage');
   }
    back(){
