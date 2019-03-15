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


const { width, height } = Dimensions.get('window');

export default class _Map extends Component {
    constructor(props){
        super(props);
        this.state={
            map:"",
        }
    }

    initPath(){  
        return path;
    }

    render(){
        return(
            <ImageBackground 
            style={styles.imageContainer} 
            source={require('../img/2-5.png')}
            imageStyle={{resizeMode: 'contain'}}>
            <Svg
            height="100"
            width="100"
            >
            <Line
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                stroke="red"
                strokeWidth="2"
            />
            </Svg>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width:Dimensions.get('window').width,
        height:width*2/3,
        alignItems:'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: '#FFF',
      },
});

