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

import android.content.Context;
import android.net.DhcpInfo;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiManager.MulticastLock;
import android.net.wifi.WifiManager.WifiLock;
import android.text.format.Formatter;
import android.widget.Toast;

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
        List<ScanResult> results = mWifiManager.getScanResults();
        mWifiConfiguration = mWifiManager.getConfiguredNetworks();
        
        if (results==null) {
        // switch (mWifiManager.getWifiState()) {
        // case 2:
        //     Toast.makeText(reactContext,"WiFi正在开启，请稍后重新点击扫描", Toast.LENGTH_SHORT).show();
        // break;
        // case 3:
        //     Toast.makeText(reactContext,"当前区域没有无线网络", Toast.LENGTH_SHORT).show();
        // break;
        // default:
        //     Toast.makeText(reactContext,"WiFi没有开启，无法扫描", Toast.LENGTH_SHORT).show();
        // break;
        // }
        }else {
        mWifiList = new ArrayList<ScanResult>();
        for(ScanResult result:results){
        if(result.SSID==null||result.SSID.length()==0||result.capabilities.contains("[IBSS]")){
            continue;
        }
        boolean found = false;
        for(ScanResult item:mWifiList){
            if(item.SSID.equals(result.SSID)&&item.capabilities.equals(result.capabilities)){
                found = true;
                break;
            }
        }
            if(!found){
                mWifiList.add(result);
            }
        }
        }
        return mWifiList;
    }
    @ReactMethod
    public void getInfo( Callback success,Callback error) {
        try {
            List<ScanResult> res=startScan(reactContext);
            success.invoke(res.get(0).BSSID+"level:"+res.get(0).level);
        }
        catch (Exception e){
            StringWriter writer = new StringWriter();
            PrintWriter stringWriter = new PrintWriter(writer);
		    e.printStackTrace(stringWriter);
            error.invoke(writer.toString());
        }
    }
}
