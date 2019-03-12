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


const { width, height } = Dimensions.get('window')
export default class ListItem extends Component {

    constructor(props){
        super(props);
        this.state={
            course:"",
        }
      }

    componentWillMount(){
        //get course based on macAddress/classroom
        this.setState({course:""})
    }
    renderIcon(course){
        if(course!="")
            return <Image source={require('../img/room_full.png')} style={styles.icon}/>
        else
            return <Image source={require('../img/room_null.png')} style={styles.icon2}/>
    }

    renderCourse(course){
        //get course from macAddress
        if(course!="")
            return <Text style={styles.title2}>{course.name}</Text>;//暂定，需决定后端的course模型
        else
            return <Text style={styles.title2}>空教室   无课程安排</Text>;
    }

    renderDetail(course){//有课无课按照不同方式处理
        if(course!="")
            return (
            <View style={{flexDirection:'column'}}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description2}>教室距离</Text>
                    <Text style={styles.description}>{this.props.distance}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description2}>授课老师</Text>
                    <Text style={styles.description}>{this.props.teacher}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description2}>下课时间</Text>
                    <Text style={styles.description}>暂定</Text>
                </View>
            </View>
            )
        else
            return(
            <View style={{flexDirection:'column'}}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description2}>教室距离</Text>
                    <Text style={styles.description}>{this.props.distance}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description2}>预计自习人数</Text>
                    <Text style={styles.description}>暂定</Text>
                </View>
            </View>
            )
    }

    render(){
        return(
            <TouchableOpacity
            activeOpacity={0.75}
            onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                        {this.renderIcon(this.state.course)}
                        <View>
                            <Text style={styles.title}>{this.props.name}</Text>
                            {this.renderCourse(this.state.course)}
                            {this.renderDetail(this.state.course)}
                        </View>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Image source={require('../img/distance.png')} style={styles.iconSmall}/>
                            <Text style={styles.description}>距离{this.props.distance}m内</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    
    

}

const styles = StyleSheet.create({
    container: {
        elevation:3,
        marginVertical:5,
        marginHorizontal:4,
        width:Dimensions.get('window').width-8,
        borderRadius:5,
        backgroundColor: '#FFFFFF',
    },
    imageContainer: {
      width:100,
      height:100,
      borderRadius:5,
    },
    title:{
        color:'black',
        fontSize:20
    },
    title2:{
        color:'black',
        fontSize:17
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