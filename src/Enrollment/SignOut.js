import React from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import ajax from '../ajax';
import messaging from '@react-native-firebase/messaging';
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC2232',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC2232',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC2232',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text2: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  smalltext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
export default class Enrollment extends React.Component {
  async signUserIn() {
    this.props.navigation.navigate('Enrollment');
  }
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>You have been signed out</Text>
          <Text style={styles.smalltext}>
            Thank you for using The Red Alliance{'\n'}
          </Text>
          <Button
            onPress={() => {
              this.signUserIn();
            }}
            title="Sign In Again"
            backgroundColor="#000000"
            color="#ffffff"
            style={{marginTop: '30px'}}
            accessibilityLabel="Sign in to The Red Alliance"
          />
        </View>
      </Swiper>
    );
  }
}
