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
import {Linking, Platform, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VersionCheck from 'react-native-version-check';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';
import ThemeProvider, {refreshTheme} from '../ThemeProvider';
import {GoogleSignin} from '@react-native-community/google-signin';
import DeviceInfo from 'react-native-device-info';

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
  getDiagInfo() {
    DeviceInfo.getCarrier().then(carrier => {
      this.setState({carrier});
    });
    if (Platform.OS === 'android') {
      DeviceInfo.getLastUpdateTime().then(lastUpdateTime => {
        this.setState({lastUpdateTime: new Date(lastUpdateTime)});
      });
    }
    DeviceInfo.getPowerState().then(state => {
      const {batteryLevel, batteryState, lowPowerMode} = state;
      this.setState({
        batteryLevel: (batteryLevel * 100).toFixed(0),
        batteryState,
        lowPowerMode,
      });
    });
    DeviceInfo.isEmulator().then(isEmulator => {
      this.setState({isEmulator});
    });
    DeviceInfo.isAirplaneMode().then(airplaneModeOn => {
      this.setState({airplaneModeOn});
    });
    DeviceInfo.hasGms().then(hasGms => {
      this.setState({hasGms});
    });
  }
  styles = {
    bold: {fontWeight: 'bold'},
    italic: {fontStyle: 'italic'},
    underline: {textDecorationLine: 'underline'},
  };
  async getTeam() {
    await ajax.getUserInfo().then(userInfo => {
      try {
        this.setState({userTeam: userInfo.team});
      } catch {
        this.setState({userTeam: undefined});
        console.warn('Could not get user team assocation');
      }
    });
  }
  componentDidMount() {
    this.getCurrentUser();
    this.getTeam();
    this.getDiagInfo();
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
                <Text style={this.styles.bold}>
                  {this.state.currentUserName}
                </Text>{' '}
                {this.state.userTeam !== undefined
                  ? `(Team ${this.state.userTeam})`
                  : ''}
                {'\n'}
                <Text style={this.styles.italic}>
                  {this.state.currentUserEmail}
                </Text>
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
              <Button
                hasText
                onPress={() => {
                  Alert.alert(
                    'Diagnostic Information',
                    `Version: ${VersionCheck.getCurrentVersion()}\nBuild: ${VersionCheck.getCurrentBuildNumber()}\nPlatform: ${
                      Platform.OS === 'ios' ? 'iOS' : 'Android'
                    } ${Platform.Version}\nEngine: ${
                      global.HermesInternal ? 'Hermes' : 'JSC'
                    }\nDevice: ${DeviceInfo.getBrand()} ${DeviceInfo.getDeviceId()}\nCarrier: ${
                      this.state.carrier
                    }\nApp Last Updated: ${
                      this.state.lastUpdateTime === undefined
                        ? 'Unknown'
                        : this.state.lastUpdateTime
                    }\nBattery Level: ${
                      this.state.batteryLevel
                    }%\nCharging Status: ${
                      this.state.batteryState
                    }\nLow Power Mode: ${
                      this.state.lowPowerMode ? 'Yes' : 'No'
                    }\nEmulated: ${
                      this.state.isEmulator ? 'Yes' : 'No'
                    }\nAirplane Mode: ${
                      this.state.airplaneModeOn ? 'Yes' : 'No'
                    }\nGoogle Mobile Services: ${
                      this.state.hasGms ? 'Yes' : 'No'
                    }`,
                    [
                      {
                        text: 'OK',
                        style: 'cancel',
                      },
                    ],
                    {cancelable: true},
                  );
                }}>
                <Text>Show Diagnostic Information</Text>
              </Button>
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
          </Card>
          <Card>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>
                Made with <Icon name="cards-heart" size={15} color="#FF0000" />{' '}
                by Titan Scouting
              </Text>
            </CardItem>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>
                © Titan Scouting 2021. All Rights Reserved.
              </Text>
            </CardItem>
          </Card>
        </Container>
      </StyleProvider>
    );
  }
}
