// TimestampModule.java
package com.catalogapptechnonext.development;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.os.Handler;
import android.os.Looper;

public class TimestampModule extends ReactContextBaseJavaModule {
  private static final String MODULE_NAME = "TimestampModule";
  private static final String EVENT_NAME = "TimestampEvent";
  private Handler handler;
  private Runnable runnable;
  private static final long INTERVAL = 20000; // 20 seconds in milliseconds

  public TimestampModule(ReactApplicationContext reactContext) {
    super(reactContext);
    handler = new Handler(Looper.getMainLooper());
  }

  @Override
  public String getName() {
    return MODULE_NAME;
  }

  @ReactMethod
  public void startTimer() {
    if (runnable == null) {
      runnable = new Runnable() {
        @Override
        public void run() {
          sendTimestamp();
          handler.postDelayed(this, INTERVAL);
        }
      };
      handler.post(runnable); // Start immediately
    }
  }

  @ReactMethod
  public void stopTimer() {
    if (runnable != null) {
      handler.removeCallbacks(runnable);
      runnable = null;
    }
  }

  private void sendTimestamp() {
    if (getReactApplicationContext().hasActiveCatalystInstance()) {
      long timestamp = System.currentTimeMillis();
      WritableMap params = Arguments.createMap();
      params.putDouble("timestamp", (double) timestamp);
      getReactApplicationContext()
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(EVENT_NAME, params);
    }
  }

  @Override
  public void initialize() {
    super.initialize();
    startTimer();
  }

  @Override
  public void onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy();
    stopTimer();
  }

  // Required methods for NativeEventEmitter
  @ReactMethod
  public void addListener(String eventName) {
    // No-op: Required for NativeEventEmitter
  }

  @ReactMethod
  public void removeListeners(int count) {
    // No-op: Required for NativeEventEmitter
  }
}
