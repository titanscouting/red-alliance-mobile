import React from 'react';
import ThemeProvider from '../MainTab/ThemeProvider'
import ajax from '../ajax'
import {Alert, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

export default class Enrollment extends React.Component {
constructor() {
    super();
    this.state = {teamValue: ''}
    this.state.teamValue === '' ? this.getTeamData() : this.refreshTeamData();
}
componentDidMount() {
  if (!GoogleSignin.isSignedIn()) {
    ajax.getIDToken();
  }
}
async getTeamData() {
  AsyncStorage.getItem("tra-is-enrolled-user").then((err, value) => {
    this.state.isEnrolled = value === "true"
  })
  this.getCreds().then((creds) => {
    ajax.checkUserTeam(creds).then((data) => {
      if (data.team && data.success == true) {
        this.setState({teamValue: data.team.toString()})
        AsyncStorage.setItem('tra-user-team', toString(data.team)).then(() => {
          AsyncStorage.setItem("tra-is-enrolled-user", "true").then(() => {
              this.props.navigation.navigate('Teams');  
          })
        })
      }
    })
  }).catch(this.throwError);
}
async refreshTeamData() {
  AsyncStorage.getItem("tra-is-enrolled-user").then((err, value) => {
    this.state.isEnrolled = value === "true"
  })
  this.getCreds().then((creds) => {
    ajax.checkUserTeam(creds).then((data) => {
      if (data.team && data.success == true) {
        this.setState({teamValue: data.team.toString()})
        AsyncStorage.setItem('tra-user-team', toString(data.team)).then(() => {
          AsyncStorage.setItem("tra-is-enrolled-user", "true")
        })
      }
    })
  }).catch(this.throwError);
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
    })
  }).catch(this.throwError);
}

render() {
    const enrollmentStyle = ThemeProvider.enrollmentStyle;
    this.state.teamValue === '' ? this.getTeamData() : this.refreshTeamData();
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
          subtitle: ''
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
            onChangeText={text => this.setState({teamValue: String(text)})}
            value={this.state.teamValue}
            keyboardType="number-pad"
          />,
          title: 'Enter your team number',
          subtitle: 'Get the data for your team by entering your team number',
        },
      ]}
    />
    );
  }
}
