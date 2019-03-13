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
    PermissionsAndroid
} from 'react-native';
import { UltimateListView } from 'react-native-ultimate-listview'
import ListItem from './src/Component/ListItem'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker'

const { width, height } = Dimensions.get('window')
export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
        data:[],
        imageUrl:'',
        building:['仙Ⅰ', '仙Ⅱ'],
        floor:[1, 2, 3, 4, 5],
        currentBuilding:'仙Ⅱ',
        currentFloor:5
    }
  }
  
  refresh=()=>{
      this.listView.refresh()
  }

  onFetch =async(page = 1, startFetch, abortFetch) => {
    NativeModules.WifiM.getInfo((success)=>{
        this.setState({data:JSON.parse(success).content})
    },(error)=>{alert(error)});
    startFetch(this.state.data,20);
  }

  _setState=(data)=>{
    this.setState({
      currentBuilding: data[0],
      currentFloor: data[1]
  })
  }//不确定语法

  showPicker = ()=> {
    let locationData = [['仙Ⅰ', '仙Ⅱ'], ['F1', 'F2', 'F3', 'F4', 'F5']]
    Picker.init({
        pickerCancelBtnText:'取消',
        pickerConfirmBtnText:'确认',
        pickerTitleText: '请选择教学楼和楼层',
        pickerConfirmBtnColor: [184,34,221,1],
        pickerCancelBtnColor: [184,34,221,1],
        pickerBg: [255,255,255,1],
        pickerToolBarFontSize: 16,
        pickerData: locationData,
        selectedValue: ['仙Ⅰ', '1F'],
        onPickerConfirm: (data) => {
            this._setState(data)
        }
    });
    Picker.show();
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
        {/* <Image source={this.state.imageUrl} style={{flex:4}}/> */}
        <TouchableOpacity
          onPress={this.requestReadPermission.bind(this)}>
          <Text>申请读写权限</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onFetch}>
            <Text>获取信息</Text>
        </TouchableOpacity>
        <UltimateListView
            ref={(ref) => this.listView = ref}
            onFetch={this.onFetch}
            refreshableMode="basic" //basic or advanced
            item={this.renderItem}  //this takes two params (item, index)
            numColumns={1} //to use grid layout, simply set gridColumn > 1

            //----Extra Config----
            //header={this.renderHeaderView}
            //paginationFetchingView={this.renderPaginationFetchingView}
            //paginationFetchingView={this.renderPaginationFetchingView}
            //paginationAllLoadedView={this.renderPaginationAllLoadedView}
            //paginationWaitingView={this.renderPaginationWaitingView}
            //emptyView={this.renderEmptyView}
            //separator={this.renderSeparatorView}                
            />
        <ActionButton buttonColor="rgba(231,76,60,1)" position="right" verticalOrientation='up'>
          <ActionButton.Item buttonColor='#9b59b6' title="选择楼层" onPress={this.showPicker}>
            <Icon name="ios-pin-outline" style={styles.actionButtonIcon}/>{/**图标问题 */}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="刷新" onPress={this.refresh}>
            <Icon name="md-refresh" style={styles.actionButtonIcon}/>
          </ActionButton.Item>
        </ActionButton>
       </View>
    );
  }

  renderItem = (item, index, separator) => {
      return(
          <ListItem
          name={item.MacAdd}
          distance={item.Level}/>
      )
  }

  async requestReadPermission() {
    try {
        //返回string类型
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});