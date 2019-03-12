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
  }

  onFetch =async(page = 1, startFetch, abortFetch) => {
    NativeModules.WifiM.getInfo((success)=>{
        this.setState({data:JSON.parse(success).content})
    },(error)=>{alert(error)});
    startFetch(this.state.data,20);
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
});