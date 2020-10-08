import {
    Body,
    Button, Card,
    CardItem, Container, Header,
    Right, StyleProvider,
    Text, Title, View
  } from 'native-base';
import React from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import ThemeProvider from '../MainTab/ThemeProvider'
import ajax from '../ajax'
export default class Enrollment extends React.Component {
constructor() {
    super();
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
async addUser() {
  await ajax.addUserToTeam(2022);
}
static navigationOptions = {
  //To hide the NavigationBar from current Screen
  header: null
};
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
        </View>
        <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
          <Button onPress={async () => {await this.addUser(); this.props.navigation.navigate('Teams');}}>
            <Text>Get Started</Text>
          </Button>
        </View>
      </Container>
    </StyleProvider>
    );
  }
}
