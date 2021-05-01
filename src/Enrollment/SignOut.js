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
    let userInfo;
    try {
      userInfo = await GoogleSignin.getCurrentUser();
      if (userInfo === null) {
        throw {code: statusCodes.SIGN_IN_REQUIRED};
      }
      if (userInfo !== null) {
        const now = Date.now();
        const jsonValue = JSON.stringify({key: userInfo.idToken, time: now});
        await AsyncStorage.setItem('tra-google-auth', jsonValue);
        const userTeamData = await ajax.getUserInfo(userInfo.idToken);
        this.setState({idToken: userInfo.idToken});
        try {
          if (Number.isFinite(parseInt(userTeamData.team, 10))) {
            this.setState({team: userTeamData.team});
            await AsyncStorage.setItem('tra-is-enrolled-user', 'true');
            messaging().subscribeToTopic(`${this.state.team}_broadcastMessage`);
            this.props.navigation.navigate('Teams');
          }
        } catch (e) {
          console.log('Error with team assoc data ', e);
        }
      }
    } catch (e) {
      if (e.code === statusCodes.SIGN_IN_REQUIRED) {
        userInfo = await GoogleSignin.signIn();
        this.signUserIn();
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.warn('Already signing in...');
      } else if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert(
          'You must login with Google to use The Red Alliance!',
          'Please check that you are connected to the internet and try again.',
          [
            {
              text: 'OK',
              onPress: () => {
                this.signUserIn();
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        console.error('Could not sign user in', e.code);
      }
    }
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
            color="#8F182C"
            style={{marginTop: '30px'}}
            accessibilityLabel="Sign in to The Red Alliance"
          />
        </View>
      </Swiper>
    );
  }
}
