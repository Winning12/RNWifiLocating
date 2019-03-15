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
import data from '../Json/2-5.json'

let AnimatePath = Animated.createAnimatedComponent(Path);
const { width} = Dimensions.get('window');
var height=width;
var _height=0,_width=0
var pathList=[511,513,515,517,519,521,522,523]
var x1=0,y1=0
export default class _Map extends Component {
    constructor(props){
        super(props);
        this.state={
            map:"",
            
        }
        
    }

    initMap(){  
        const orderImage = Image.resolveAssetSource(require("../img/2-5.png"))
        _width=orderImage.width
        _height=orderImage.height
        height=width*_height/_width
    }

    // renderPath(point){
    //     for(var i=0;i<data.length;i++){
    //         if(data[i][0]==point){
    //             path=(
    //                 /* <Line
    //                     x1={""+x1}
    //                     y1={""+y1}
    //                     x2={""+data[i][2]/_width*width}
    //                     y2={""+data[i][1]/_height*height}
    //                     stroke="red"
    //                     strokeWidth="3"
    //                 /> */
    //             )
    //             x1=data[i][2]/_width*width
    //             y1=data[i][1]/_height*height
    //             return(
    //                 path
    //             )
    //         }
    //     }
    // }

    renderPaths(pathList){
        var Path="M"
        for(var i=0;i<data.length;i++){
            if(data[i][0]==pathList[0]){
                x1=parseInt(data[i][2]/_width*width)
                y1=parseInt(data[i][1]/_height*height)
            }
        }
        Path+=x1+" "+y1+" "
        var Path0=Path
        for(var j=1;j<pathList.length;j++){
            for(var i=0;i<data.length;i++){
                if(data[i][0]==pathList[j]){
                    x1=parseInt(data[i][2]/_width*width)
                    y1=parseInt(data[i][1]/_height*height)
                    Path+="L"+x1+" "+y1+" "
                    Path0+="l0 0"
                }
            }
        }
        return(  
            <AnimatePath
                strokeLinecap="round" 
                strokeDashoffset={this.state.strokeDashOffset}
                strokeWidth="3" 
                d={Path}
            />
        )
    }

    render(){
        this.initMap()
        return(
            <ImageBackground 
            style={{
                flex: 1,
                width:width,
                height:height,
                alignItems:'flex-end',
                justifyContent: 'flex-end',
                backgroundColor: '#FFF',}}
            source={require('../img/2-5.png')}
            imageStyle={{resizeMode: 'cover'}}>
            <Svg
            height={""+height}
            width={""+width}
            >
            <G fill="none" stroke="#3d5875">
        
                {this.renderPaths(pathList)}
                
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

