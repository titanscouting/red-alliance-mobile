/* eslint-disable react-native/no-inline-styles */
import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  Right,
  StyleProvider,
  Subtitle,
  Title,
} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  RefreshControl,
} from 'react-native';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import ajax from '../../../ajax';
import TeamCell from './TeamCell';
import {io} from 'socket.io-client';

export default class TeamList extends React.Component {
  static propTypes = {
    teams: PropTypes.array.isRequired,
    refreshTeams: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    matchNumber: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  state = {
    refreshing: false,
  };

  onRefresh = async silent => {
    if (silent === undefined) {
      silent = false;
    }
    if (!silent) {
      this.setState({refreshing: true});
    }
    this.getCompetitionName();
    await this.props.refreshTeams();
    if (!silent) {
      this.setState({refreshing: false});
    }
  };

  onBack = () => {
    this.props.onBack();
  };
  getCompetitionName() {
    ajax.getCompetitionFriendlyName().then(data => {
      this.setState({competitionFriendlyName: data.friendlyName});
    });
  }
  doNothing = teamNumber => {
    Alert.alert(
      'Match Already Being Scouted',
      'This match is already being scouted by another user. If you continue, the current scouter will be removed from the match. Are you sure you would like to remove the current scouter?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await ajax.removeScouterFromMatch(
              teamNumber,
              this.props.matchNumber,
            );
            this.props.refreshTeams();
          },
          style: 'cancel',
        },
        {text: 'No'},
      ],
      {cancelable: true},
    );
  };
  async listenScouterChange() {
    const competition = await ajax.getCurrentCompetition();
    this.setState({competition});
    this.socket.on(
      `${competition}_${this.props.matchNumber}_scoutChange`,
      () => {
        this.onRefresh(true);
      },
    );
  }
  componentDidMount() {
    this.getCompetitionName();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this.socket = io('wss://titanscouting.epochml.org');
    this.socket.on('connect', () => {
      this.onRefresh();
    });
    this.socket.on('disconnect', () => {
      this.onRefresh();
    });
    this.listenScouterChange();
  }
  componentWillUnmount() {
    this.socket.off(
      `${this.state.competition}_${this.props.matchNumber}_scoutChange`,
    );
    this.socket.disconnect();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackPress = () => {
    this.socket.off(
      `${this.state.competition}_${this.props.matchNumber}_scoutChange`,
    );
    this.socket.disconnect();
    this.onBack();
    return true;
  };

  showRefresh = serious => {
    this.setState({refreshing: serious});
  };

  render() {
    if (this.props.teams.length === 0) {
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
              <Body
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Title>Match {this.props.matchNumber}</Title>
              </Body>
              <Right
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              />
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
              <Body
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Title>Match {this.props.matchNumber}</Title>
                <Subtitle>{this.state.competitionFriendlyName}</Subtitle>
              </Body>
              <Right
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              />
            </Header>
            <FlatList
              data={this.props.teams}
              style={this.props.style}
              renderItem={({item}) => (
                <TeamCell
                  number={item.teamNumber}
                  isBlue={item.isBlue}
                  scouterDescription={item.scouterDescription}
                  onPress={
                    item.scouterDescription
                      ? this.doNothing.bind(this, item.teamNumber)
                      : this.props.onItemPress
                  }
                  showRefresh={this.showRefresh}
                  style={this.props.style}
                />
              )}
              keyExtractor={item => String(item.teamNumber)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
            />
          </Container>
        </StyleProvider>
      );
    }
  }
}
