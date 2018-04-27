
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text,  View, Image, TouchableOpacity, TextInput, Linking, AsyncStorage, Alert } from 'react-native';

const { width } = Dimensions.get('window');

getAdjustedFontSize = (size) => {
    return parseInt(size) * width * (1.8 - 0.002 * width) / 400;
}

export default class App extends Component{
    constructor() {
        super()

        this.state = {
            langas: 1,
            text: 'Lorem ipsum dolor sit amet, et amet posuere torquent per enim, lacus velit, non suspendisse aliquet convallis ut',
            symbolCont: 0,
            temperatura: 0,
        };
    }

    componentWillMount(){
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    let key = store[i][0];
                    let value = store[i][1];

                    if(key != null && value != null && key == "aboutme"){
                        this.setState({text: value});
                    }
                });
            });
        });

        this.getOras();
    }

    getOras(){
        return fetch('https://www.metaweather.com/api/location/44418/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({temperatura: Math.round(responseJson.consolidated_weather[0].the_temp)});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    saveInfoToDB(){
        AsyncStorage.clear();
        AsyncStorage.setItem("aboutme", this.state.text);
    }

    render() {
        if(this.state.langas == 1){
            return (
                <View style={mainScreenStyles.mainContainer}>
                    <View style={mainScreenStyles.nameContainer}>
                        <Text style={mainScreenStyles.welcomeTxt}>Edgaras D.</Text>
                    </View>
                    <View style={mainScreenStyles.mainPavCoontainer}>
                        <Image style={mainScreenStyles.mainImage}
                               source={require('./Komponentai/mob.png')}/></View>
                    <View style={mainScreenStyles.BtnContainer}>
                        <TouchableOpacity style={mainScreenStyles.btn} onPress={() => this.setState({langas: 2})}>
                            <View><Text style={mainScreenStyles.btnText}>My Profile</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        else{
            return (
                <View style={infoScreenStyles.mainContainer}>
                    <View style={infoScreenStyles.toolbarContainer}>
                        <Text style={{fontSize: getAdjustedFontSize(22), color: '#000000'}}>My profile</Text>
                    </View>
                    <View style={infoScreenStyles.picnNameContainer}>
                        <Image style={infoScreenStyles.profileImage}
                               source={require('./Komponentai/profile.png')}/>
                        <View style={infoScreenStyles.pNCNameContainer}>
                            <Text style={{fontSize: getAdjustedFontSize(25), color: '#000000'}}>Edgaras D.</Text>
                        </View>
                    </View>
                    <View style={infoScreenStyles.aboutMeContainer}>
                        <Text style={{fontSize: getAdjustedFontSize(14), margin: "2%"}}>About me</Text>
                    </View>
                    <View style={infoScreenStyles.aboutMeInfoContainer}>
                        <TextInput autoCapitalize={'none'}
                                   multiline={true}
                                   maxLength={160}
                                   numberOfLines={3}
                                   placeholder={this.state.text}
                                   style={infoScreenStyles.txtInput}
                                   onChangeText={(text) => this.setState({text})} value={this.state.text}
                                   onChange={this.saveInfoToDB()} />
                    </View>
                    <View style={infoScreenStyles.counterContainer}>
                        <Text>{this.state.text.length}/160</Text>
                    </View>
                    <Text style={infoScreenStyles.tempTxt}>I live in City where current {'\n'} temperature is</Text>
                    <Text style={[infoScreenStyles.tempTxt, {fontSize: getAdjustedFontSize(35)}]}>{this.state.temperatura} °C</Text>
                    <View style={infoScreenStyles.BtnContainer}>
                        <TouchableOpacity style={infoScreenStyles.btn} onPress={() => Linking.openURL('https://github.com/edgada/ztask')}>
                            <View><Text style={infoScreenStyles.btnText}>My Github Profile</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        };
    }
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
                },
});

const infoScreenStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
        toolbarContainer: {
            width: '100%',
            height: '10%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#e5e5e5',
            paddingLeft: '5%',
        },
        picnNameContainer: {
            width: '100%',
            height: '25%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '5%',
            paddingTop: '2%',
        },
            profileImage: {
                width: '40%',
                height: '100%',
                resizeMode: 'contain',
            },
            pNCNameContainer: {
                width: '60%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '5%',
            },
        aboutMeContainer: {
            width: '100%',
            height: '4%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: '6%',
        },
            aboutMeInfoContainer: {
                width: '100%',
                height: '12%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '5%',
                paddingRight: '5%',
            },
                txtInput: {
                    width: "100%",
                    height: "100%",
                    fontSize: getAdjustedFontSize(16),
                },
        counterContainer: {
            width: '100%',
            height: '3%',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            paddingRight: '7%',
        },
        tempTxt: {
            fontSize: getAdjustedFontSize(20),
            margin: '2%',
            fontWeight: 'bold',
            color: '#000000',
            textAlign: 'center',
        },
    BtnContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '5%',
    },
        btn: {
            width: '45%',
            height: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#5ba595',
            borderRadius: 5,
        },
            btnText: {
                color: '#ffffff',
                fontSize: getAdjustedFontSize(20),
            },
    });