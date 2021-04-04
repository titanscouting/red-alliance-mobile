import React from 'react';
import ThemeProvider from '../MainTab/ThemeProvider';
import ajax from '../ajax';
import {TextInput, Text, View, StyleSheet, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

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
});
export default class Enrollment extends React.Component {
  constructor() {
    super();
    this.state = {team: ''};
    this.signUserIn.bind(this);
  }

  state = {
    team: '',
    isSignInProgress: false,
  };
  componentDidMount() {
    this.checkUserSignIn();
  }
  addUser() {
    this.signUserIn();
    const team = this.state.team;
    ajax.addUserToTeam(team, this.state.idToken).then(response => {
      try {
        if (response.success !== true) {
          ajax.warnCouldNotAdd(team);
          this.signUserIn();
          return;
        } else {
          this.setState({team: parseInt(this.state.team, 10)});
          AsyncStorage.setItem('tra-is-enrolled-user', 'true').then(
            this.props.navigation.navigate('Teams'),
          );
        }
      } catch {
        ajax.warnCouldNotAdd(team);
      }
    });
  }
  async checkUserSignIn() {
    let userInfo = await GoogleSignin.getCurrentUser();
    if (userInfo !== null) {
      const now = Date.now();
      const jsonValue = JSON.stringify({key: userInfo.idToken, time: now});
      await AsyncStorage.setItem('tra-google-auth', jsonValue);
      const userTeamData = await ajax.getUserInfo(userInfo.idToken);
      this.setState({idToken: userInfo.idToken});
      try {
        if (Number.isFinite(userTeamData.team)) {
          this.setState({team: userTeamData.team});
          this.setState({isSignInProgress: false});
          AsyncStorage.setItem('tra-is-enrolled-user', 'true').then(
            this.props.navigation.navigate('Teams'),
          );
        }
      } catch (e) {
        console.log('Error with team assoc data ', e);
      }
    }
  }
  async signUserIn(forceUserSignIn) {
    this.setState({isSignInProgress: true});
    let userInfo;
    try {
      userInfo = await GoogleSignin.getCurrentUser();
      if (userInfo === null || forceUserSignIn === true) {
        throw {code: statusCodes.SIGN_IN_REQUIRED};
      }
      if (userInfo !== null || forceUserSignIn !== true) {
        const now = Date.now();
        const jsonValue = JSON.stringify({key: userInfo.idToken, time: now});
        await AsyncStorage.setItem('tra-google-auth', jsonValue);
        const userTeamData = await ajax.getUserInfo(userInfo.idToken);
        if (!userTeamData.success) {
          ajax.couldNotLogin();
          this.signUserIn(true);
        }
        this.setState({idToken: userInfo.idToken});
        try {
          if (Number.isFinite(parseInt(userTeamData.team, 10))) {
            this.setState({team: userTeamData.team});
            this.setState({isSignInProgress: false});
            const jsonValue2 = JSON.stringify({
              key: userInfo.idToken,
              time: now,
            });
            await AsyncStorage.setItem('tra-google-auth', jsonValue2);
            AsyncStorage.setItem('tra-is-enrolled-user', 'true').then(
              this.props.navigation.navigate('Teams'),
            );
          }
        } catch (e) {
          console.log('Error with team assoc data ', e);
        }
      }
    } catch (e) {
      if (e.code === statusCodes.SIGN_IN_REQUIRED) {
        userInfo = await GoogleSignin.signIn()
          .then(() => {
            this.signUserIn();
          })
          .catch(() => {
            Alert.alert(
              'You must login with Google to use The Red Alliance!',
              'Please check that you are connected to the internet and try again.',
              [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ],
              {cancelable: true},
            );
          });
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.warn('Already signing in...');
      } else if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert(
          'You must login with Google to use The Red Alliance!',
          'Please check that you are connected to the internet and try again.',
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
          {cancelable: true},
        );
      } else {
        console.error('Could not sign user in', e.code);
      }
    }
  }
  render() {
    const googleStyle = {width: 192, height: 48};
    const signUpStyle = {marginTop: '30px'};
    const enrollmentStyle = ThemeProvider.enrollmentStyle;
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>The Red Alliance</Text>
          <Text style={styles.smalltext}>
            Scouting Matches for your FRC team{'\n'}
          </Text>
          <GoogleSigninButton
            style={googleStyle}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
              this.signUserIn();
            }}
            disabled={this.state.isSigninInProgress}
          />
        </View>
        <View style={styles.slide1}>
          <Text style={styles.text2}>Scout qualification matches</Text>
          <Text style={styles.smalltext}>
            Collect data about robot performance
          </Text>
        </View>
        <View style={styles.slide3}>
          <TextInput
            defaultValue="2022"
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
            Get the data for your team by entering your team number
          </Text>
          <Button
            onPress={() => {
              this.addUser.bind(this);
              this.addUser();
            }}
            title="Sign Up"
            color="#8F182C"
            style={signUpStyle}
            accessibilityLabel="Sign up for The Red Alliance"
          />
        </View>
      </Swiper>
    );
  }
}
