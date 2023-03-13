import {StyleProvider} from 'native-base';
import React from 'react';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';
import GLOBAL from '../../GlobalDefinitions';
import ThemeProvider from '../ThemeProvider';
import Eval from './Evaluation/Eval';
import MatchList from './MatchList/MatchList';
import TeamList from './TeamsList/TeamList';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';

export default class Matches extends React.Component {
  _isMounted = false;
  state = {
    matches: [],
    currentMatchNumber: null,

    teams: null,
    currentTeamNumber: null,
    isBlue: null,

    configuration: {},
  };

  componentDidMount() {
    this._isMounted = true;
    this.pullConfiguration();
    this.refreshMatches();
  }

  refreshMatches = async () => {
    const deviceTimeZone = RNLocalize.getTimeZone();
    let matches = await ajax.fetchMatches();
    let compSchedule = [];
    try {
      compSchedule = await ajax.fetchCompetitionSchedule();
    } catch {
      compSchedule = [];
    }
    compSchedule.sort((a, b) => a.match - b.match); // sort by first match
    for (const item of compSchedule) {
      const date = moment(item.time).tz(deviceTimeZone);
      matches[item.match - 1].time = date.format('ddd h:mm a z');
    }
    this.state.matches = matches;
    await this.pullConfiguration();
    this.forceUpdate();
  };

  currentMatch = () => {
    return this.matches.find(match => match.key === this.currentMatchNumber);
  };

  async componentWillUnmount() {
    this._isMounted = false;
  }

  setCurrentMatch = async number => {
    this.state.currentMatchNumber = number;
    this.state.teams = [];
    this.forceUpdate();
    this.refreshTeams();
  };

  unsetCurrentMatch = () => {
    this.state.currentMatchNumber = null;
    this.state.teams = null;
    this.forceUpdate();
  };

  getTeams = async () => {
    const teams = await ajax.fetchTeamsForMatch(this.state.currentMatchNumber);
    return teams;
  };
  refreshTeams = async () => {
    let teams = await this.getTeams();
    this.state.teams = teams;
    this.forceUpdate();
  };

  setCurrentTeam = async (teamNumber, isBlue) => {
    let teams = await this.getTeams();
    for (var team in teams) {
      let number = teams[team].teamNumber;
      if (number === teamNumber && teams[team].scouterDescription != null) {
        this.refreshTeams();
        return;
      }
    }
    ajax.addScouterToMatch(
      teamNumber.toString(),
      this.state.currentMatchNumber.toString(),
    );
    this.state.currentTeamNumber = teamNumber;
    this.state.isBlue = isBlue;
    this.forceUpdate();
    this.pullConfiguration();
  };
  unsetCurrentTeam = () => {
    this.state.currentTeamNumber = null;
    this.forceUpdate();
  };

  pullConfiguration = async () => {
    let config;
    try {
      config = await ajax.fetchMatchConfig();
      this.setState({configuration: config});
    } catch (e) {
      this.setState({config: []});
    }
  };

  popEval = () => {
    this.setState({currentTeamNumber: null});
  };

  saveScouting = async vals => {
    const resp = await ajax.submitMatchData(
      this.state.currentTeamNumber,
      this.state.currentMatchNumber,
      vals,
    );
    if (!resp.success) {
      // try again
      ajax.getIDToken(true);
      const resp2 = await ajax.submitMatchData(
        this.state.currentTeamNumber,
        this.state.currentMatchNumber,
        vals,
      );
      if (!resp2.success) {
        ajax.warnCouldNotSubmit();
      }
    } else {
      this.setState({
        currentMatchNumber: null,
        teams: null,
        currentTeamNumber: null,
        isBlue: null,
      });
      this.forceUpdate();
    }
  };

  render() {
    const matchesStyle = ThemeProvider.matchesStyle;
    if (this.state.currentTeamNumber != null) {
      return (
        <StyleProvider style={getTheme(material)}>
          <Eval
            configuration={this.state.configuration}
            onBack={this.popEval}
            onSave={this.saveScouting}
            matchNumber={this.state.currentMatchNumber}
            teamNumber={this.state.currentTeamNumber}
            isBlue={this.state.isBlue}
          />
        </StyleProvider>
      );
    } else if (
      this.state.currentMatchNumber != null &&
      this.state.teams != null
    ) {
      return (
        <StyleProvider style={getTheme(material)}>
          <TeamList
            teams={this.state.teams}
            refreshTeams={this.refreshTeams}
            matchNumber={this.state.currentMatchNumber}
            onBack={this.unsetCurrentMatch}
            onItemPress={this.setCurrentTeam}
            style={matchesStyle}
          />
        </StyleProvider>
      );
    } else {
      return (
        <StyleProvider style={getTheme(material)}>
          <MatchList
            matches={this.state.matches}
            onItemPress={this.setCurrentMatch}
            refreshMatches={this.refreshMatches}
            style={matchesStyle}
          />
        </StyleProvider>
      );
    }
  }
}
