import React from 'react';
import {Platform, Text} from 'react-native';

export default class AppleAuth extends React.Component {
  // only show Apple Sign-in on iOS - we only even have it for app store approval.
  render() {
    if (Platform.OS === 'ios') {
      return (
        <Text style={{color: 'white'}}>Coming soon: Sign in with Apple</Text>
      );
    } else {
      return null;
    }
  }
}
