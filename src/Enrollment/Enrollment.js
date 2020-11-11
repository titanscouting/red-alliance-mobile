import React, { Component } from 'react'
import ThemeProvider from '../MainTab/ThemeProvider'
import ajax from '../ajax'
import {Alert, TextInput, Image, Text, View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC2232'
  },
  
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC2232'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC2232'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text2: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  smalltext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'normal'
  }
})
export default class Enrollment extends React.Component {
constructor() {
    super();
    this.state = {teamValue: ''}
    this.state.teamValue === '' ? this.getTeamData() : this.refreshTeamData();
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
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
      <View style={styles.slide1}>
        <Text style={styles.text}>The Red Alliance</Text>
        <Text style={styles.smalltext}>Scouting Matches for your FRC team</Text>
      </View>
      <View style={styles.slide1}>
        <Text style={styles.text2}>Scout qualification matches</Text>
        <Text style={styles.smalltext}>Collect data about robot performance</Text>
      </View>
      <View style={styles.slide3}>
        <TextInput
            style={enrollmentStyle.textInputStyle}
            onChangeText={(text) => {this.setState.bind(this); this.setState({teamValue: String(text)})}}
            value={this.state.teamValue}
            keyboardType="number-pad"
          />
        <Text style={styles.text2}>Enter your team number</Text>
        <Text style={styles.smalltext}>Get the data for your team by entering your team number</Text>
        <Button
          onPress={() => {this.addUser.bind(this); this.addUser()}}
          title="Sign In"
          color="#8F182C"
          style={{marginTop: "30px"}}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </Swiper>
    );
  }
}
