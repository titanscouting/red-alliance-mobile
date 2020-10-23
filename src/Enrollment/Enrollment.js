import {
  Body,
  Button, Container, Header,
  StyleProvider,
  Text, Title, View,
} from 'native-base';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import ThemeProvider from '../MainTab/ThemeProvider'
import ajax from '../ajax'
import {Alert, TextInput, Linking, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Onboarding from 'react-native-onboarding-swiper';

export default class Enrollment extends React.Component {
constructor() {
    super();
    this.state = {teamValue: '2022'}
    this.getCreds().then((creds) => {
      ajax.checkUser(creds).then((data) => {
        if (data.isEnrolled) {
          this.props.navigation.navigate('Teams')
        }
      })
    })
}
async getCreds() {
  this.userToken = await ajax.getIDToken()
  return this.userToken;
}
throwError() {
  Alert.alert(
    'Error',
    `There was an error adding you to the team.`,
    [
      {
        text: 'OK',
        onPress: () => {},
        style: 'cancel',
      },
    ],
    {cancelable: true},
  );
}
async addUser() {
  await ajax.addUserToTeam(parseInt(this.state.teamValue)).then(() => {
    AsyncStorage.setItem("tra-is-enrolled-user", "true").then(() => {
      this.props.navigation.navigate('Teams');
    }).catch(this.throwError);
  }).catch(this.throwError);
}

render() {
    const enrollmentStyle = ThemeProvider.enrollmentStyle;
    return (
      <Onboarding
      nextLabel='Next'
      onDone={() => {this.addUser.bind(this); this.addUser()}}
      showSkip={false}
      controlStatusBar={true}
      pages={[
        {
          backgroundColor: '#CC2232',
          color: '#fff',
          image: <Image source={require('./assets/iconTransparent.png')} />,
          title: 'Welcome to The Red Alliance',
          subtitle: 'Collect data for your FRC team',
        },
        {
          backgroundColor: '#CC2232',
          color: '#fff',
          image: <Image source={require('./assets/screen1.jpg')} />,
          title: 'View and scout qualification matches',
          subtitle: 'Collect data about robot performance and gain a competitive advantage',
        },
        {
          backgroundColor: '#CC2232',
          color: '#fff',
          image: <TextInput
            style={enrollmentStyle.textInputStyle}
            onChangeText={(text) => (this.setState({teamValue: text}))}
            value={this.state.teamValue}
            keyboardType="number-pad"
            placeholder="2022"
          />,
          title: 'Enter your team number',
          subtitle: 'Get the data for your team by entering your team number',
        },
      ]}
    />
    );
  }
}
