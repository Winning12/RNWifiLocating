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
    FlatList
} from 'react-native';
import { UltimateListView } from 'react-native-ultimate-listview'
// import ListItem from './src/Component/ListItem'
import ListItemElement from './src/Component/ListItemElement'
import ListItemElementByName from './src/Component/ListItemElementByName'
import _Map from './src/Component/Map'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker'
import * as Animatable from 'react-native-animatable';

const { width} = Dimensions.get('window')
const height=width*1034/1607
var rooms=[[{name:"计科楼225"},{name:"计科楼231"},{name:"计科楼232"},{name:"计科楼233"},{name:"计科楼203"},{name:"计科楼202"},{name:"计科楼201"},{name:"计科楼204"},{name:"计科楼213"}],
[{name:"仙二310"},{name:"仙二311"},{name:"仙二312"},{name:"仙二313"},{name:"仙二314"},{name:"仙二315"},{name:"仙二316"},{name:"仙二317"},{name:"仙二318"},{name:"仙二319"},{name:"仙二301"},{name:"仙二303"},{name:"仙二304"},{name:"仙二305"},{name:"仙二306"},{name:"仙二307"}],
[{name:"仙二410"},{name:"仙二411"},{name:"仙二412"},{name:"仙二413"},{name:"仙二414"},{name:"仙二415"},{name:"仙二416"},{name:"仙二417"},{name:"仙二418"},{name:"仙二419"},{name:"仙二420"},{name:"仙二421"},{name:"仙二422"},{name:"仙二401"},{name:"仙二402"},{name:"仙二403"},{name:"仙二404"},{name:"仙二405"},{name:"仙二406"}],
[{name:"仙二511"},{name:"仙二512"},{name:"仙二513"},{name:"仙二514"},{name:"仙二515"},{name:"仙二516"},{name:"仙二517"},{name:"仙二518"},{name:"仙二519"},{name:"仙二520"},{name:"仙二521"},{name:"仙二522"},{name:"仙二523"},{name:"仙二524"},{name:"仙二501"},{name:"仙二503"},{name:"仙二504"},{name:"仙二505"},{name:"仙二506"},{name:"仙二507"},{name:"仙二508"}]]

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
        data:[],
        imageUrl:'',
        building:['仙Ⅰ', '仙Ⅱ'],
        floor:[1, 2, 3, 4, 5],
        currentBuilding:'仙Ⅱ',
        currentFloor:4,
        path:[],
        start:"",
        des:"",
        level:-100,
    }
  }
  
  up(x,y){//用于将数据升序显示
    return y.Level-x.Level
  }

  componentDidMount(){
    NativeModules.WifiM.getInfo((success)=>{
        let content=JSON.parse(success).content
        // content.sort(this.up)
        this.setState({data:content})
        this.listView.refresh()
    },(error)=>{alert(error)});
  }

  getPath=()=>{
    var formData=new FormData();
    var jsonArr = [];
    formData.append("startPoint",parseInt(this.state.start))
    formData.append("endPoint",parseInt(this.state.des))
    formData.append("floor",this.state.currentFloor)
    fetch('http://118.25.56.186:8080/api/classroom/navigation', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body:formData
        }).then((response) => response.json())
        .then((response) => {
            var json = response.detail;
            for(var i =0 ;i < json.length;i++){
                jsonArr[i] = json[i];
            }
            this.setState({path:jsonArr})
            this.forceUpdate() 
        })
        .catch((error) => {
            if (error) {
                console.log('error', error);
            }
    });
  }
  
  refresh=()=>{
    this.state.data=[]
    this.state.level=-100
    this.listView.updateDataSource(this.state.data)	
    NativeModules.WifiM.getInfo((success)=>{
        let content=JSON.parse(success).content
        // content.sort(this.up)
        this.setState({data:content})
        this.listView.updateDataSource(this.state.data)	
    },(error)=>{alert(error)});
  }


  onFetch =async(page = 1, startFetch, abortFetch) => {
    NativeModules.WifiM.getInfo((success)=>{
        this.setState({data:JSON.parse(success).content})
    },(error)=>{alert(error)});
    startFetch(this.state.data,20);
  }

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
        selectedValue: ['仙Ⅱ', 'F5'],
        onPickerConfirm: (data) => {
        this.setState({
          currentBuilding: data[0],
          currentFloor: parseInt(data[1].substring(1,2)),
        })
        }
    });
    Picker.show();
  }

  renderAllList=()=>{
    return (
        <View>
          <View style={{flex:1,flexDirection:'column',alignItem:'center',justifyContent:'center'}}>
            <Text style={{fontSize:25}}>下为所有该层教室，方便调试</Text>
          </View>
          <FlatList
          data={rooms[this.state.currentFloor-2]}
          renderItem={this.renderItem2}
          />
        </View>
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Animatable.View 
        animation='fadeIn' 
        duration={600}
        style={styles.header} 
        useNativeDriver>
          <_Map 
          path={this.state.path}
          floor={this.state.currentFloor}
          building={this.state.currentBuilding}
          start={this.state.start}
          des={this.state.des}/>
        </Animatable.View>
        {/* <Text>{this.state.des}</Text>
        <Text>{this.state.start}</Text> */}
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
            paginationAllLoadedView={this.renderAllList}
            //paginationWaitingView={this.renderPaginationWaitingView}
            //emptyView={this.renderEmptyView}
            //separator={this.renderSeparatorView}                
        />
        <ActionButton buttonColor="rgba(231,76,60,1)" position="right" verticalOrientation='up'>
          <ActionButton.Item buttonColor='#9b59b6' title="权限重新申请" onPress={this.requestReadPermission}>
            <Icon name="md-repeat" style={styles.actionButtonIcon}/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="选择楼层" onPress={this.showPicker}>
            <Icon name="ios-pin-outline" style={styles.actionButtonIcon}/>{/**图标问题 */}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="刷新" onPress={this.refresh}>
            <Icon name="md-refresh" style={styles.actionButtonIcon}/>
          </ActionButton.Item>
        </ActionButton>
       </View>
    );
  }

  setStart=(roomName,level)=>{
    if(parseInt(level)>this.state.level)
      this.setState({
        start:parseInt(roomName.substring(roomName.length-3,roomName.length)),
        currentFloor:parseInt(roomName.substring(roomName.length-3,roomName.length-2)),
        level:parseInt(level)
      });
  }

  setDes=(roomName)=>{
    this.state.des=roomName.substring(roomName.length-3,roomName.length)
    this.getPath()
  }


  renderItem = (item, index, separator) => {
      return(
          <ListItemElement
          setStart={this.setStart}
          setDes={this.setDes}
          MacAdd={item.MacAdd}
          distance={item.Level}/>
      )
  }

  renderItem2 = (rowData) => {
    return(
      <View>
        <ListItemElementByName
          setDes={this.setDes}
          name={rowData.item.name}
        />
      </View>
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
    height: height+10,
    borderColor:'rgb(230,230,230)',
    backgroundColor:'rgb(248,248,248)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});