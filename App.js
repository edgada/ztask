
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import MainScreen from './Komponentai/MainScreen';
import ProfileScreen from './Komponentai/ProfileScreen';

const Profile = StackNavigator ({
    Home: {screen: MainScreen},
    Profile: {screen: ProfileScreen},
});

export default class App extends Component<{}> {
    render() {
        return(
                <Profile />
        )
    }
}