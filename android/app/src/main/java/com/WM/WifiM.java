package com.WM;


import java.io.StringWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.app.Activity;
import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.DhcpInfo;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiManager.MulticastLock;
import android.net.wifi.WifiManager.WifiLock;
import android.text.format.Formatter;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.widget.Toast;

import static android.content.pm.PackageManager.PERMISSION_GRANTED;

public class WifiM extends ReactContextBaseJavaModule{
    private final ReactApplicationContext reactContext;

    public WifiM(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "WifiM";
    }

    private WifiManager mWifiManager;  
    private WifiInfo mWifiInfo;    
    private List<ScanResult> mWifiList;
    private List<WifiConfiguration> mWifiConfiguration;  

    public List<ScanResult> startScan(ReactContext reactContext){
        mWifiManager = (WifiManager) reactContext.getSystemService(reactContext.WIFI_SERVICE);
        mWifiInfo = mWifiManager.getConnectionInfo();
        mWifiManager.startScan();
        Activity activity = getCurrentActivity();
        List<ScanResult> results = mWifiManager.getScanResults();
        mWifiConfiguration = mWifiManager.getConfiguredNetworks();

        if (results==null) {
            
            // if(ContextCompat.checkSelfPermission(reactContext,Manifest.permission.ACCESS_FINE_LOCATION) !=PERMISSION_GRANTED) {
            //     ActivityCompat.requestPermissions(activity, new String[] { Manifest.permission.ACCESS_FINE_LOCATION}, 1);
            // }
        }else {
            mWifiList = new ArrayList<ScanResult>();
            for(ScanResult result:results){
                if(result.SSID==null||result.SSID.length()==0||result.capabilities.contains("[IBSS]")){
                    continue;
                }
                boolean found = true;
        // for(ScanResult item:mWifiList){
        //     if(item.SSID.equals(result.SSID)&&item.capabilities.equals(result.capabilities)){
        //         found = true;
        //         break;
        //     }
        // }
        //     if(!found){
                mWifiList.add(result);
        //  }
            }
        }
        return mWifiList;
    }
    @ReactMethod
    public void getInfo( Callback success,Callback error) {
        try {
            List<ScanResult> sRes=startScan(reactContext);
            String res="";
            for(int i=0;i<sRes.size();i++)
                res+=sRes.get(i).BSSID+" "+sRes.get(i).level+"\n";
            if(sRes.size()==0)
                success.invoke(mWifiManager.getWifiState());
            else
                success.invoke(res);
        }
        catch (Exception e){
            StringWriter writer = new StringWriter();
            PrintWriter stringWriter = new PrintWriter(writer);
		    e.printStackTrace(stringWriter);
            error.invoke(writer.toString());
        }
    }
}
