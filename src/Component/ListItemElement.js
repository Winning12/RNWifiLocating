"use strict"

import React, { Component } from 'react';
import {
    StyleSheet, 
    Image,       
    View ,
    Text,
    TouchableOpacity,
    Dimensions,
    ART
} from 'react-native';
import moment from 'moment';
import { ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import TouchableScale from 'react-native-touchable-scale'; 
import LinearGradient from 'react-native-linear-gradient';


export default class ListItemElement extends Component {
    constructor(props){
        super(props);
        this.state={
            fold:true,
            data:[],
            classroom:{"course":"","roomName":"获取教室信息中"},
        }
    }

    componentDidMount(){
        fetch('http://118.25.56.186:8080/api/classroom/get/'+this.props.MacAdd, {
        method: 'GET',
        headers: {
              'Content-Type': 'application/json'
        }
        }).then((response) => response.json())
        .then((response) => {
            var json = response;
            if(json.status=="FAIL")
                this.setState({data:json.detail,classroom:{"course":"","roomName":""}})
            else{
                //确认为教室后，判定所在位置，并记录教室信息
                this.props.setStart(json.detail.roomName,this.props.distance)
                this.setState({data:json.detail,classroom:{"course":"","roomName":json.detail.roomName}})
            }
            this.getCourse(json.detail.roomName)//进一步查询获得该教室当前课程信息
        })
        .catch((error) => {
            if (error) {
                console.log('error', error);
            }
            this.setState({classroom:{"course":"","roomName":""}})
        });
    }

    getCourse=(roomName)=>{
        var day=parseInt(moment().format('d'));
        if(day==0)day=7
        var period=this.getPeriod()
        var formData=new FormData();
        formData.append("day",day)
        formData.append("period",period)
        formData.append("roomName",roomName)
        if(period!=0){
            fetch('http://118.25.56.186:8080/api/section/get', {
                method: 'POST',
                body:formData,
                headers: {
                'Content-Type': 'multipart/form-data'
                }
        }).then((response) => response.json())
        .then((response) => {
            var json = response;
            if(json.status!="FAIL")
                this.setState({
                    classroom:{"course":json.detail.courseName,"roomName":roomName},
                })
        })
        .catch((error) => {
            if (error) {
                console.log('error', error);
            }
        });
        }
    }

    getPeriod(){
        var h=parseInt(moment().format('HH'));
        var m=parseInt(moment().format('mm'));
        if(h>=21&&m>30) return 0
        if(h>=20&&m>30) return 11
        if(h>=19&&m>30) return 10
        if(h>=18&&m>30) return 9
        if(h>=17&&m>10) return 8
        if(h>=16&&m>10) return 7
        if(h>=15) return 6
        if(h>=14) return 5
        if(h>=11) return 4
        if(h>=10) return 3
        if(h>=9) return 2
        if(h>=8) return 1
        return 0
    }
    
    handleCourse(){
        //get course from macAddress
        var course=this.state.classroom.course
        if(course!="")
            return course;//暂定，需决定后端的course模型
        else
            return "空教室   暂无课程安排";
    }

    render() {
        if(this.state.classroom.roomName=="")
            return null
            // return <Text>{this.props.MacAdd}" level:"{this.props.distance}</Text>;
        else
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
            onPress={()=>{
                this.setState({fold:!this.state.fold})
                this.props.setDes(this.state.classroom.roomName)
            }}
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
            rightTitle={this.props.distance}
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
            title={"课桌类型："+this.state.data.deskType}
            titleStyle={{ fontSize:17 }}
            />
            <ListItem
            containerStyle={styles.itemStyle}
            bottomDivider
            key={2}
            leftIcon={{ name:'organization',type:'octicon',size:20,style:{margin:0,padding:0} }}
            title={"教室容量："+this.state.data.capacity}
            titleStyle={{ fontSize:17 }}
            />
            <ListItem
            containerStyle={styles.itemStyle}
            bottomDivider
            key={2}
            leftIcon={{ name:'broadcast',type:'octicon',size:20,style:{margin:0,padding:0} }}
            title="估计人数："
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