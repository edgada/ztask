
import React, { Component } from 'react';
import { StyleSheet,  Text,  View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';

const { width } = Dimensions.get('window');

export default class App extends Component {

    static navigationOptions = {header: null }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={mainScreenStyles.mainContainer}>
                <View style={mainScreenStyles.nameContainer}>
                    <Text style={mainScreenStyles.welcomeTxt}>Edgaras D.</Text>
                </View>
                <View style={mainScreenStyles.mainPavCoontainer}>
                    <Image style={mainScreenStyles.mainImage}
                           source={require('./mob.png')}/></View>
                <View style={mainScreenStyles.BtnContainer}>
                    <TouchableOpacity style={mainScreenStyles.btn} onPress={() => navigate('Profile')}>
                        <View><Text style={mainScreenStyles.btnText}>My Profile</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

getAdjustedFontSize = (size) => {
    return parseInt(size) * width * (1.8 - 0.002 * width) / 400;
}

const mainScreenStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    nameContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '5%',
    },
    welcomeTxt: {
        fontSize: getAdjustedFontSize(30),
        textAlign: 'center',
        margin: 10,
    },
    mainPavCoontainer: {
        height: '40%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    BtnContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '5%',
    },
    btn: {
        width: '35%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5ba595',
        borderRadius: 5,
    },
    btnText: {
        color: '#ffffff',
        fontSize: getAdjustedFontSize(20),
    }
});