import AsyncStorage from '@react-native-community/async-storage';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Header,
  Right,
  StyleProvider,
  Text,
  Title,
} from 'native-base';
import React from 'react';
import {Linking, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VersionCheck from 'react-native-version-check';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';
import ThemeProvider, {refreshTheme} from '../ThemeProvider';
import {GoogleSignin} from '@react-native-community/google-signin';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {darkMode: false};
  }
  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser !== null) {
      this.setState({
        currentUserName: currentUser.user.name,
        currentUserEmail: currentUser.user.email,
      });
    } else {
      this.getCurrentUser();
    }
  };

  componentDidMount() {
    this.getCurrentUser();
  }
  toggleDarkMode = async () => {
    let darkMode = !this.state.darkMode;
    this.setState({darkMode: darkMode});
    try {
      AsyncStorage.setItem('tra-dark-mode', darkMode.toString());
      await refreshTheme();
    } catch (e) {
      console.error('Error setting dark mode: ', e);
    }
  };
  render() {
    const optionsStyle = ThemeProvider.optionsStyle;
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={optionsStyle}>
          <Header>
            <Body
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Title>Settings</Title>
            </Body>
          </Header>
          <Card style={optionsStyle}>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>
                Signed in as:{'\n'}
                {this.state.currentUserName}
                {'\n'}({this.state.currentUserEmail})
              </Text>
              <Right>
                <Button
                  hasText
                  onPress={() => {
                    ajax.signOut();
                    this.setState({signOut: true});
                    AsyncStorage.setItem('tra-is-enrolled-user', 'false').then(
                      this.props.navigation.navigate('SignOut'),
                    );
                  }}>
                  <Text>Sign Out</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          {/* <Card style={optionsStyle}>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>Dark Mode (ALPHA)</Text>
              <Right>
                <Button hasText onPress={this.toggleDarkMode}>
                  <Text>{this.state.darkMode ? 'Disable' : 'Enable'}</Text>
                </Button>
              </Right>
            </CardItem>
          </Card> */}
          <Card style={optionsStyle}>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>
                The Red Alliance — v{VersionCheck.getCurrentVersion()} (
                {VersionCheck.getCurrentBuildNumber()} {Platform.OS}
                {Platform.Version}-{global.HermesInternal ? 'hermes' : 'legacy'}
                )
              </Text>
            </CardItem>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>
                Made with <Icon name="cards-heart" size={15} color="#FF0000" />{' '}
                by Titan Scouting
              </Text>
            </CardItem>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>
                © Titan Scouting 2021. Licensed under the BSD 3-Clause License.
              </Text>
            </CardItem>
            <CardItem style={optionsStyle}>
              <Button
                hasText
                onPress={() => {
                  Linking.openURL(`${ajax.apiHost}privacy-policy`);
                }}>
                <Text>View Privacy Policy</Text>
              </Button>
            </CardItem>
            <CardItem style={optionsStyle}>
              <Button
                hasText
                onPress={() => {
                  Linking.openURL(
                    'https://github.com/titanscouting/red-alliance-mobile',
                  );
                }}>
                <Text>View Source Code</Text>
              </Button>
            </CardItem>
          </Card>
        </Container>
      </StyleProvider>
    );
  }
}
