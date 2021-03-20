import {Body, Container, Header, StyleProvider, Title} from 'native-base';
import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';
import GLOBAL from '../../GlobalDefinitions';
import ThemeProvider from '../ThemeProvider';
import StatsTeamCell from './StatsTeamCell';
import StatsTeamController from './StatsTeamController';

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
    this.pullTeams();
  }

  pullTeams = async () => {
    const teams = await ajax.fetchTeamsInCompetition(GLOBAL.data.competition);
    const nicknames = await ajax.fetchAllTeamNicknamesAtCompetition(
      GLOBAL.data.competition,
    );
    this.setState({teams: teams, nicknames: nicknames});
  };

  async componentWillUnmount() {
    this._isMounted = false;
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
    } else if (this.state.teams != null) {
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
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Header>
              <Body
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Title>Statistics</Title>
              </Body>
            </Header>
            <ActivityIndicator animating={true} />
          </Container>
        </StyleProvider>
      );
    }
  }
}
