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
// import ListItem from './src/Component/ListItem'
import ListItemElement from './src/Component/ListItemElement'
import _Map from './src/Component/Map'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker'
import * as Animatable from 'react-native-animatable';

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

  componentDidMount(){
    NativeModules.WifiM.getInfo((success)=>{
        this.setState({data:JSON.parse(success).content})
        this.listView.refresh()
    },(error)=>{alert(error)});
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

  render(){
    return(
      <View style={{flex:1}}>
        <Animatable.View 
        animation='fadeIn' 
        duration={600}
        style={styles.header} 
        useNativeDriver>
          <_Map/>
        </Animatable.View>
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
          <ActionButton.Item buttonColor='#663366' title="权限重新申请" onPress={this.requestReadPermission}>
            <Icon name="ios-pin-outline" style={styles.actionButtonIcon}/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#996699' title="选择楼层" onPress={this.showPicker}>
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
          <ListItemElement
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  header:{
    flexDirection: 'row',
    height: width*2/3,
    borderBottomWidth:2,
    borderColor:'rgb(230,230,230)',
    backgroundColor:'rgb(248,248,248)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});