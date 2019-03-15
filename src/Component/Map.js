import React, { Component } from 'react';
import {
    StyleSheet, 
    Image,       
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ART,
    ImageBackground
} from 'react-native';
import Svg,{
    Line
} from 'react-native-svg';
import data from '../Json/2-5.json'

const { width} = Dimensions.get('window');
var height=width;
var _height=0,_width=0
var pathList=[511,513,515,517,519,521,522,524]
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

    // renderPath(x1,y1,x2,y2){
    //     return(
    //         <Line
    //             x1={""+x1}
    //             y1={""+y1}
    //             x2={""+x2}
    //             y2={""+y2}
    //             stroke="red"
    //             strokeWidth="3"
    //         />
    //     )
    // }

    renderPath(point){
        for(var i=0;i<data.length;i++){
            if(data[i][0]==point){
                path=(
                    <Line
                        x1={""+x1}
                        y1={""+y1}
                        x2={""+data[i][2]/_width*width}
                        y2={""+data[i][1]/_height*height}
                        stroke="red"
                        strokeWidth="3"
                    />
                )
                x1=data[i][2]/_width*width
                y1=data[i][1]/_height*height
                return(
                    path
                )
            }
        }
    }

    renderPaths(pathList){
        var paths=[]
        for(var i=0;i<data.length;i++){
            if(data[i][0]==pathList[0]){
                x1=data[i][2]/_width*width
                y1=data[i][1]/_height*height
            }
        }
        for(var j=1;j<pathList.length;j++){
            paths.push(this.renderPath(pathList[j]))
        }
        return(
            paths
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
                {this.renderPaths(pathList)}
            </Svg>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
    },
});

