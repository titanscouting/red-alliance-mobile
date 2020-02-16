/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import StyleProvider, { Container } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabControl from './MainTab/TabControl';
import AsyncStorage from '@react-native-community/async-storage';

import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import ajax from './ajax';

// Other Web Client ID: 291863698243-t3adrufmitbd3ulgejs8pq255jvvuv9u.apps.googleusercontent.com
// Web client ID 291863698243-8u79bk1a6odv021fu0km8htvpu6k2uqo.apps.googleusercontent.com
// ios Client ID: 291863698243-ovppseib28p6usahf60igsp7ia3ovq6l.apps.googleusercontent.com
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '291863698243-ofnqubd0fh5dqfhjo368c39uto1fmudt.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '@imsa.edu', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '291863698243-ovppseib28p6usahf60igsp7ia3ovq6l.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  state = {
    isSignInProgress: true,
  };

  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._googleSignIn}
          disabled={this.state.isSigninInProgress} />
      </View>
    );
  }

  _googleSignIn = async () => {
    try {
      const idToken = await ajax.getIDToken()
      console.log(idToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp}/>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));