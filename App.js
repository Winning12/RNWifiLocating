"use strict"

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, 
    ScrollView,
    Dimensions,  
    TouchableWithoutFeedback,
    Image,       
    View ,
    Text,
    TouchableOpacity,
    NativeModules   
} from 'react-native';

const { width, height } = Dimensions.get('window')
export default class App extends Component {

  _wifi(){
    NativeModules.WifiM.getInfo((success)=>{alert(success)},(error)=>{alert(error)});
  }
  render(){
    return(
      <View style={{flex:1}}>
        <TouchableOpacity onPress={this._wifi}>
            <Text>获取信息</Text>
        </TouchableOpacity>
       </View>
    );
  }

renderItem() {
    // 数组
    var itemAry = [];
    // 颜色数组
    var colorAry = ['gray', 'green', 'blue', 'yellow', 'black', 'orange'];
    // 遍历
    for (var i = 0; i<colorAry.length; i++) {
        itemAry.push(
            <View key={i} style={[styles.itemStyle, {backgroundColor: colorAry[i]}]}></View>
        );
    }
    return itemAry;
}

    sigleTap() { // 手势这个暂未搞明白
        var timestamp = new Date().getTime(); // 时间戳
    }

}
var styles = StyleSheet.create({
  scrollViewStyle: {
      // 背景色
      backgroundColor:'red'
  },

  itemStyle: {
      // 尺寸
      width:1000,
      height:200
  },
});