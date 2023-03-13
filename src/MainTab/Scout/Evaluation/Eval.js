import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  Right,
  StyleProvider,
  Tab,
  TabHeading,
  Tabs,
  Text,
  Title,
} from 'native-base';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  StyleSheet,
  View,
} from 'react-native';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import ajax from '../../../ajax';
import Globals from '../../../GlobalDefinitions';
import EvalTab from './EvalTab';
import {io} from 'socket.io-client';

interface EvalProps {
  configuration: unknown[];
  onSave(...args: unknown[]): unknown;
  onBack(...args: unknown[]): unknown;
  matchNumber: number;
  teamNumber: number;
  isBlue: boolean;
}

export default class Eval extends React.Component<EvalProps> {
  _isMounted = true;
  vals = {};

  onBack = () => {
    if (!this._isMounted) {
      return;
    }
    Alert.alert(
      'Discard your changes?',
      'If you go back, the fields will not be saved.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Discard',
          onPress: () => {
            ajax.removeScouterFromMatch(
              this.props.teamNumber.toString(),
              this.props.matchNumber.toString(),
            );
            this.props.onBack();
            ajax.fetchMatches();
          },
        },
      ],
      {cancelable: true},
    );
  };

  onSave = () => {
    this.props.onSave(this.vals);
  };

  doNothing = () => {};

  getTab = tabNumber => {
    let tabDict = this.props.configuration[tabNumber];
    let title = Object.keys(tabDict)[0];
    let tab = tabDict[title];
    return [title, tab];
  };

  getTabTitle = tabNumber => {
    let [title, tab] = this.getTab(tabNumber);
    return title;
  };

  getTabBody = tabNumber => {
    let [title, tab] = this.getTab(tabNumber);
    return tab;
  };

  onUpdate = (key, value) => {
    this.vals[key] = value;
  };
  generateTabs = () => {
    return this.props.configuration.map((item, index) => {
      return (
        <Tab heading={this.getTabTitle(index)}>
          <EvalTab
            tabConfig={this.getTabBody(index)}
            onUpdate={this.onUpdate}
          />
        </Tab>
      );
    });
  };
  async listenScouterChange() {
    this.socket = io('https://scouting.titanrobotics2022.com', {
      transports: ['websocket', 'polling'], // use WebSocket first, if available
    });
    this.socket.on('connect_error', () => {
      // revert to classic upgrade
      this.socket.io.opts.transports = ['polling', 'websocket'];
      console.log('Could not connect to websocket, reverting to polling!');
    });
    const competition = await ajax.getCurrentCompetition();
    const userInfo = await ajax.getUserInfo();
    this.setState({
      socketChannelName: `${String(
        userInfo.team,
      )}_${competition}_${this.props.matchNumber.toString()}_scoutChange`,
    });
    this.socket.on(
      `${String(
        userInfo.team,
      )}_${competition}_${this.props.matchNumber.toString()}_scoutChange`,
      payload => {
        if (
          payload.action === 'remove' &&
          payload.match.toString() === this.props.matchNumber.toString() &&
          payload.team.toString() === this.props.teamNumber.toString() &&
          this.state.removing !== true &&
          this._isMounted
        ) {
          this.setState({removing: true});
          this.props.onBack();
          Alert.alert(
            `You have been removed from this match by ${payload.performedBy}.`,
            'Your scouting data has not been saved.',
            [
              {
                text: 'OK',
                onPress: () => {},
              },
            ],
            {cancelable: false},
          );
        }
      },
    );
  }
  componentDidMount() {
    this._isMounted = true;
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this.listenScouterChange();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.socket.off(this.state.socketChannelName);
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }

  handleBackPress = () => {
    this.socket.off(this.state.socketChannelName);
    this.onBack();
    return true;
  };

  render() {
    if (this.props.configuration.length === 0) {
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Header>
              <Body style={styles.body}>
                <View
                  style={
                    this.props.isBlue ? styles.circleBlue : styles.circleRed
                  }
                />
                <Title>Team {this.props.teamNumber}</Title>
              </Body>
            </Header>
            <ActivityIndicator animating={true} />
          </Container>
        </StyleProvider>
      );
    } else {
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Header>
              <Left
                style={{
                  paddingLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Button transparent onPress={this.onBack}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body style={styles.body}>
                <View
                  style={
                    this.props.isBlue ? styles.circleBlue : styles.circleRed
                  }
                />
                <Title>Team {this.props.teamNumber}</Title>
              </Body>

              <Right>
                <Button transparent onPress={this.onSave}>
                  <Icon name="save" />
                </Button>
              </Right>
            </Header>
            <Tabs>{this.generateTabs()}</Tabs>
          </Container>
        </StyleProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  circleRed: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: Globals.colors.red,
    borderWidth: 1,
    borderColor: 'white',
  },
  circleBlue: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: Globals.colors.blue,
    borderWidth: 1,
    borderColor: 'white',
  },
  body: {
    flexDirection: 'row',
  },
});
