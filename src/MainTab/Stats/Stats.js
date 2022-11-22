import {
  Body,
  Container,
  Header,
  StyleProvider,
  Subtitle,
  Title,
} from 'native-base';
import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';
import ThemeProvider from '../ThemeProvider';
import StatsTeamCell from './StatsTeamCell';
import StatsTeamController from './StatsTeamController';
import {io} from 'socket.io-client';

export default class Stats extends React.Component {
  _isMounted = false;
  state = {
    teams: null,
    currentTeamNumber: null,
    nicknames: null,
    isBlue: null,
    data: {},
  };

  componentDidMount() {
    this._isMounted = true;
    this.getCompetitionName();
    this.pullTeams();
    this.listenScouterChange();
  }

  pullTeams = async () => {
    this.setState({isRefreshing: true});
    this.getCompetitionName();
    const teams = await ajax.fetchTeamsInCompetition();
    const nicknames = await ajax.fetchAllTeamNicknamesAtCompetition();
    this.setState({teams: teams, nicknames: nicknames});
    this.setState({isRefreshing: false});
  };
  getCompetitionName() {
    ajax.getCompetitionFriendlyName().then(data => {
      this.setState({competitionFriendlyName: data.friendlyName});
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  async listenScouterChange() {
    this.socket = io("https://scouting.titanrobotics2022.com", {
      transports: ["websocket", "polling"] // use WebSocket first, if available
    });
    this.socket.on("connect_error", () => {
      // revert to classic upgrade
      this.socket.io.opts.transports = ["polling", "websocket"];
      console.log("Could not connect to websocket, reverting to polling!");
    });
    const userInfo = await ajax.getUserInfo();
    const competition = await ajax.getCurrentCompetition();
    this.socket.on(`${String(userInfo.team)}_${competition}_newPitData`, () => {
      this.pullTeams();
    });
  }

  setCurrentTeam = number => {
    this.setState({currentTeamNumber: number});
  };
  removeCurrentTeam = () => {
    this.setState({currentTeamNumber: null});
  };

  render() {
    const statsStyle = ThemeProvider.statsStyle;
    if (this.state.currentTeamNumber != null) {
      return (
        <StyleProvider style={getTheme(material)}>
          <StatsTeamController
            team={this.state.currentTeamNumber}
            nickname={this.state.nicknames[this.state.currentTeamNumber]}
            onBack={this.removeCurrentTeam}
          />
        </StyleProvider>
      );
    } else if (this.state.teams != null && this.state.nicknames != null) {
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Header>
              <Body
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Title>Statistics</Title>
                <Subtitle>{this.state.competitionFriendlyName}</Subtitle>
              </Body>
            </Header>
            <FlatList
              data={this.state.teams}
              renderItem={({item}) => (
                <StatsTeamCell
                  team={item}
                  nickname={this.state.nicknames[item]}
                  onItemPress={this.setCurrentTeam}
                  style={statsStyle}
                />
              )}
              keyExtractor={item => String(item)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.teams.length === 0}
                  onRefresh={this.pullTeams}
                />
              }
              style={statsStyle}
              showsVerticalScrollIndicator={false}
            />
          </Container>
        </StyleProvider>
      );
    } else {
      const bodyStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      };
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Header>
              <Body style={bodyStyle}>
                <Title>Statistics</Title>
                <Subtitle>{this.state.competitionFriendlyName}</Subtitle>
              </Body>
            </Header>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.pullTeams}
                />
              }
              style={statsStyle}
              showsVerticalScrollIndicator={false}
            />
            <ActivityIndicator animating={true} />
          </Container>
        </StyleProvider>
      );
    }
  }
}
