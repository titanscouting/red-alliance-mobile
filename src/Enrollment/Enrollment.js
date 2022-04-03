import React from 'react';
import ThemeProvider from '../MainTab/ThemeProvider';
import ajax from '../ajax';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import {Toast} from 'native-base';
import EncryptedStorage from 'react-native-encrypted-storage';

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
  },
  textInputStyle: {
    flex: 1,
    alignItems: 'stretch',
    width: 200
  }
});
export default class Enrollment extends React.Component {
  constructor() {
    super();
    this.state = {team: '2022'};
  }
  addUser() {
    const team = this.state.team;
    ajax.addUserToTeam(team).then(response => {
      try {
        if (response.success !== true) {
          ajax.warnCouldNotAdd();
          return;
        } else {
          this.setState({team: parseInt(this.state.team, 10)});
          AsyncStorage.setItem('tra-is-enrolled-user', 'true').then(
            this.props.navigation.navigate('Teams'),
          );
        }
      } catch {
        ajax.warnCouldNotAdd();
      }
    });
  }
  async handleGoodSignIn(userInfo) {
    if (userInfo !== null) {
      const now = Date.now();
      const jsonValue = JSON.stringify({key: userInfo.idToken, time: now});
      await EncryptedStorage.setItem('tra-google-auth', jsonValue);
      const userTeamData = await ajax.getUserInfo(userInfo.idToken);
      if (userTeamData.success !== true) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Login was not successful! Try registering to a team.',
            ToastAndroid.LONG,
          );
        } else {
          Toast.show({
            text: 'Login was not successful! Try registering to a team.',
            type: 'error',
            buttonText: 'OK',
            duration: 2000,
          });
        }
        console.warn('Error validating token, likely RNGoogleNative error.');
      }
      this.setState({idToken: userInfo.idToken});
      try {
        if (Number.isFinite(parseInt(userTeamData.team, 10))) {
          this.setState({team: userTeamData.team});
          AsyncStorage.setItem('tra-is-enrolled-user', 'true').then(
            this.props.navigation.navigate('Teams'),
          );
        }
      } catch (e) {
        console.log('Error with team assoc data ', e);
      }
    }
  }
  async signUserIn() {
    let userInfo;
    try {
      userInfo = await GoogleSignin.signIn();
      userInfo = await GoogleSignin.getCurrentUser();
      if (userInfo === null) {
        throw {code: statusCodes.SIGN_IN_REQUIRED};
      }
      if (userInfo !== null) {
        this.handleGoodSignIn(userInfo);
      }
    } catch (e) {
      if (e.code === statusCodes.SIGN_IN_REQUIRED) {
        userInfo = await GoogleSignin.signIn();
        this.signUserIn();
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.warn('Already signing in...');
      } else if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        // alert only if the user isn't already signed in
        const user = await GoogleSignin.getCurrentUser();
        const signedIn = await GoogleSignin.isSignedIn();
        if (user !== null && signedIn) {
          this.handleGoodSignIn(user);
          return;
        }
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

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission({
      announcement: true,
      badge: true,
    });
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;
    if (!enabled) {
      Alert.alert(
        'Notifications permissions have not been granted!',
        'The Red Alliance mobile app requires the ability to send notifications to allow your team administrator to send you critical information. Please enable notifications access in Settings.',
        [
          {
            text: 'OK',
            onPress: () => {
              this.requestUserPermission();
            },
          },
        ],
        {cancelable: false},
      );
    }
  }
  componentDidMount() {
    this.requestUserPermission().then(() => {
      this.signUserIn();
    });
  }
  render() {
    const enrollmentStyle = ThemeProvider.enrollmentStyle;
    this.props.navigation.addListener('focus', () => {
      this.componentDidMount();
    });
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>The Red Alliance</Text>
          <Text style={styles.smalltext}>
            Scouting Matches for your FRC team{'\n'}
          </Text>
        </View>
        <View style={styles.slide1}>
          <Text style={styles.text2}>Scout qualification matches</Text>
          <Text style={styles.smalltext}>
            Collect data about robot performance
          </Text>
        </View>
        <View style={styles.slide3}>
          <TextInput
            defaultValue='2022'
            style={enrollmentStyle.textInputStyle}
            onChangeText={text => {
              this.setState.bind(this);
              this.setState({team: String(text)});
            }}
            value={String(this.state.team)}
            keyboardType="number-pad"
          />
          <Text style={styles.text2}>Enter your team number</Text>
          <Text style={styles.smalltext}>
            Scout for your team by entering your team number
          </Text>
          <Text>{'\n'}</Text>
          <Button
            onPress={() => {
              this.addUser.bind(this);
              this.addUser();
            }}
            title="Sign Up"
            accessibilityLabel="Sign up for The Red Alliance"
          />
        </View>
      </Swiper>
    );
  }
}
