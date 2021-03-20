import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

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
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>You have been signed out</Text>
          <Text style={styles.smalltext}>
            Thank you for using The Red Alliance{'\n'}
            Force exit the app to sign in again{'\n'}
          </Text>
        </View>
      </Swiper>
    );
  }
}
