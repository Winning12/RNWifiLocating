import React, { Component } from 'react';
import {
    StyleSheet, 
    Image,       
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ART,
    ImageBackground,
    Animated
} from 'react-native';
import Svg,{
    Line,
    Path,
    G
} from 'react-native-svg';
import data23 from '../Json/2-3.json'
import data24 from '../Json/2-4.json'
import data25 from '../Json/2-5.json'

let AnimatePath = Animated.createAnimatedComponent(Path);
const { width} = Dimensions.get('window');
var height=width;
var _height=0,_width=0
var x1=0,y1=0
const img_arr = [[require('../map/default.png')],[require('../map/default.png'),require('../map/default.png'),require('../map/2-3.png'),require('../map/2-4.png'),require('../map/2-5.png')]]
const data_arr = [data23,data23,data23,data24,data25]//数据不足，仅采集了仙二3~5层的位置数据
var data=data_arr[0]
export default class _Map extends Component {
    constructor(props){
        super(props);
        this.state={
            floor:this.props.floor,
            lineFillAnimation: new Animated.Value(0),
            path:[]
        }
        
        this.lineAnimation = this.state.lineFillAnimation.interpolate({
            inputRange: [
               0,
               100
            ],
            outputRange: [
               `M0 0 l0 0 l0 0`,
               `M0 0 l0 0 l0 0`,
            ]
         });
    }

    
    componentDidMount()
    {
        this.setState({
            path:this.props.path,
            floor:this.props.floor,
        })
        
        Animated.spring(
            this.state.lineFillAnimation,
            {
                toValue: 100,
                friction: 5,
                tension: 5
            }
        ).start();
    }

    init(){
        this.state.lineFillAnimation=new Animated.Value(0)
        this.lineAnimation = this.state.lineFillAnimation.interpolate({
            inputRange: [
               0,
               100
            ],
            outputRange: [
               `M0 0 l0 0 l0 0`,
               `M0 0 l0 0 l0 0`,
            ]
         });
         Animated.timing(
             this.state.lineFillAnimation,
             {
                 toValue: 100,
                 duration:1000
             }
         ).start();
    }

    initData(){
        return data_arr[this.props.floor-1]
    }
    initMap(){  
        var mapSrc="";
        if(this.props.building=="仙Ⅱ")
            mapSrc=img_arr[1][this.props.floor-1]
        else
            mapSrc=img_arr[0][0]
        const orderImage = Image.resolveAssetSource(mapSrc)
        _width=orderImage.width
        _height=orderImage.height
        height=width*_height/_width
        return mapSrc;
    }

    renderCurPosi(){
        this.init()
        data=this.initData()
        var x0=100,y0=100
        for(var i=0;i<data.length;i++){
            if(this.props.start==data[i][0]){
                x0=(data[i][2]/_width*width)
                y0=(data[i][1]/_height*height)
            }
        }
        return(
            <Image
            style={{
                position: 'absolute',
                left:x0,
                top:y0,
                width:width/10,
                height:width/10
            }} 
            source={require("../img/point.png")}
            />
        )
    }

    renderPaths(pathList){
        this.init()
        this.initMap()
        var Path="M"
        for(var i=0;i<data.length;i++){
            if(data[i][0]==pathList[0]){
                x1=(data[i][2]/_width*width)
                y1=(data[i][1]/_height*height)
            }
        }
        Path+=x1+" "+y1+" "
        var Path0=Path
        var x2=x1
        var y2=y1
        for(var j=1;j<pathList.length;j++){
            for(var i=0;i<data.length;i++){
                if(data[i][0]==pathList[j]){
                    x1=(data[i][2]/_width*width)
                    y1=(data[i][1]/_height*height)
                    Path+="l"+(x1-x2)+" "+(y1-y2)+" "
                    Path0+="l0 0 "  
                    x2=x1
                    y2=y1
                }
            }
        }
        this.lineAnimation = this.state.lineFillAnimation.interpolate({
            inputRange: [
               0,
               100
            ],
            outputRange: [
               Path0,
               Path,
            ]
         });
        return(  
            <AnimatePath
                strokeLinecap="round" 
                strokeDashoffset={this.state.strokeDashOffset}
                strokeWidth="3" 
                d={this.lineAnimation}
                //d={Path}
            />
        )
    }

    render(){
        var src=this.initMap()
        return(
            <ImageBackground 
            style={{
                flex: 1,
                width:width,
                height:height,
                alignItems:'flex-end',
                justifyContent: 'flex-end',
                backgroundColor: '#FFF',}}
            source={src}
            imageStyle={{resizeMode: 'cover'}}>
            <Svg
            height={""+height}
            width={""+width}
            >
            <G fill="none" stroke="#3d5875">
                {this.renderCurPosi()}
                {this.renderPaths(this.props.path)}
                
            </G>
            </Svg>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
    },
});

