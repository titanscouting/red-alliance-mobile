import React, { Component } from 'react'
import ThemeProvider from '../MainTab/ThemeProvider'
import ajax from '../ajax'
import { Alert, TextInput, Image, Text, View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
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
  render() {
    const enrollmentStyle = ThemeProvider.enrollmentStyle;
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>You have been signed out</Text>
          <Text style={styles.smalltext}>Thank you for using The Red Alliance{"\n"}</Text>
        </View>
      </Swiper>
    );
  }
}
