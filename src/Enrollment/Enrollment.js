import {
  Body,
  Button, Container, Header,
  StyleProvider,
  Text, Title, View,
} from 'native-base';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import ThemeProvider from '../MainTab/ThemeProvider'
import ajax from '../ajax'
import {Alert, TextInput, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class Enrollment extends React.Component {
constructor() {
    super();
    this.state = {teamValue: '2022'}
    this.getCreds().then((creds) => {
      ajax.checkUser(creds).then((data) => {
        if (data.isEnrolled) {
          this.props.navigation.navigate('Teams')
        }
      })
    })
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
    }).catch(this.throwError);
  }).catch(this.throwError);
}

render() {
    const enrollmentStyle = ThemeProvider.enrollmentStyle;
    return (
    <StyleProvider style={getTheme(material)}>
      <Container style={enrollmentStyle.generic}>
        <Header>
            <Body
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Title>Welcome to The Red Alliance</Title>
            </Body>
        </Header>
        <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
          <Text style={enrollmentStyle.title1Style}>Enroll into an FRC Team</Text>
          <Text style={enrollmentStyle.disclaimerStyle} onPress={() => { Linking.openURL('https://scouting-api.herokuapp.com/privacy-policy');}}>
            By using The Red Alliance, you agree to our Terms and Conditions and Privacy Policy.
          </Text>
        </View>
        <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
        }}>
          <Text style={enrollmentStyle.generic}>Enter your FRC team number below:</Text>
          <View style={{padding: 30, width: 'auto'}}>
            <TextInput
              style={enrollmentStyle.textInputStyle}
              onChangeText={(text) => (this.setState({teamValue: text}))}
              value={this.state.teamValue}
              keyboardType="number-pad"
              placeholder="2022"
            />
          </View>

          <Button onPress={async () => {this.addUser()}}>
            <Text>Start Scouting</Text>
          </Button>
        </View>
      </Container>
    </StyleProvider>
    );
  }
}
