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
    NativeModules,
    PermissionsAndroid,
    Picker
    
} from 'react-native';

const { width, height } = Dimensions.get('window')
export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
        data:[],
        imageUrl:'',
        building:['仙Ⅰ', '仙Ⅱ'],
        floor:[1, 2, 3, 4, 5]
    }
    this.setState=this.setState.bind(this)
  }

  _wifi=()=>{
    NativeModules.WifiM.getInfo((success)=>{
      this.setState({data:success})
    },(error)=>{alert(error)});
  }

  initUrl(){
    {/**根据wifi的MAC地址获取初始化位置 */}
  }

  getAvailableClassroom(){
    {/**获取附近教室 */}
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Image source={imageUrl} style={{flex:4}}></Image> {/**页面分为10份 */}
        <TouchableOpacity
          onPress={this.requestReadPermission.bind(this)}>
          <Text>申请读写权限</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._wifi}>
            <Text>获取信息</Text>
            <Text>{this.state.data}</Text>
        </TouchableOpacity>
        <View style={{flex:5}}>
          <ScrollView contentContainerStyle={{paddingVertical:20}}>
            {this.getAvailableClassroom()}
          </ScrollView>
        </View>
        <View style={{flex:1}}>
          <Picker selectedValue={this.state.building[0]}>

          </Picker>
        </View>
      </View>
    );
  }

  async requestReadPermission() {
    try {
        //返回string类型
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                //第一次请求拒绝后提示用户你为什么要这个权限
                'title': '检测到安卓6.0以上版本',
                'message': '基于wifi的室内定位在安卓6.0版本后被划为位置信息，请您同意接下来的权限申请'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.show("你已获取了位置权限")
        } else {
            this.show("获取位置权限失败")
        }
    } catch (err) {
        this.show(err.toString())
    }
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