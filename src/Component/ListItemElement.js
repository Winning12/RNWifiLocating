"use strict"

import React, { Component } from 'react';
import {
    StyleSheet, 
    Image,       
    View ,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { ListItem,Divider } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import TouchableScale from 'react-native-touchable-scale'; 
import LinearGradient from 'react-native-linear-gradient';

export default class ListItemElement extends Component {
    constructor(props){
        super(props);
        this.state={
            fold:true,
            classroom:{"course":"","roomName":"获取教室信息中"},
        }
    }

    
    handleCourse(){
        //get course from macAddress
        var course=this.state.classroom.course
        if(course!="")
            return course;//暂定，需决定后端的course模型
        else
            return "空教室   无课程安排";
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderTitle()}
                {this.renderDetail()}
            </View>
        );
    }

    renderTitle=()=>{
        return(
            <ListItem
            onPress={()=>this.setState({fold:!this.state.fold})}
            containerStyle={{borderRadius:5}}
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            linearGradientProps={{
            colors: ['#ebedee', '#fbfbfb'],
            start:{ x: 1, y: 0 } ,
            end:{ x: 0, y: 0 }
            }}
            ViewComponent={LinearGradient} // Only if no expo
            /* leftAvatar={{ rounded: true, source: { uri: avatar_url } }} */
            title={this.state.classroom.roomName}
            titleStyle={{ fontWeight: 'bold',fontSize:20 }}
            subtitle={this.handleCourse()}
            chevronColor="white"
            chevron
            />
        )
    }

    renderDetail=()=>{
        if(!this.state.fold)
        return(
        <Animatable.View
        animation="slideInLeft"
        duration={300}
        useNativeDriver>
            <ListItem
            containerStyle={styles.itemStyle}
            bottomDivider
            key={1}
            leftIcon={{ name:'inbox',type:'octicon',size:20,style:{margin:0,padding:0} }}
            title="课桌类型：XXXX"
            titleStyle={{ fontSize:17 }}
            />
            <ListItem
            containerStyle={styles.itemStyle}
            bottomDivider
            key={2}
            leftIcon={{ name:'location',type:'octicon',size:20,style:{margin:0,padding:0} }}
            title="预估人数：XXXX"
            titleStyle={{ fontSize:17 }}
            />
        </Animatable.View>
        )
        else return null;
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        elevation:3,
        marginVertical:5,
        marginHorizontal:4,
        width:Dimensions.get('window').width-8,
        borderRadius:5,
        backgroundColor: '#FFFFFF',
    },
    itemStyle:{
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
        flexDirection:'row',
        padding:0,
        paddingLeft:10,
        height:35,
    },
    imageContainer: {
        width:100,
        height:100,
        borderRadius:5,
    },
    descriptionContainer:{
        flexDirection:'row',
        alignItems:'flex-start'
    },
    description:{
        fontSize:15,
        color:'black',
    },
    description2:{
        fontSize:15,
        color:'#6A005F',
        marginRight:15
    },
    icon:{
        marginLeft:5,
        marginRight:5,
        width:Dimensions.get('window').height/7,
        height:Dimensions.get('window').height/7
    },
    icon2:{
        marginLeft:5,
        marginRight:5,
        opacity:0.7,
        width:Dimensions.get('window').height/7,
        height:Dimensions.get('window').height/7
    },
    iconSmall:{
        marginLeft:5,
        marginRight:5,
        opacity:0.7,
        width:Dimensions.get('window').height/14,
        height:Dimensions.get('window').height/14
    }
});