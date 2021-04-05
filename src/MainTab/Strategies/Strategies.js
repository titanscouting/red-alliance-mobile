import {
  Body,
  Container,
  Header,
  StyleProvider,
  Subtitle,
  Title,
} from 'native-base';
import React, {Component} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';
import ThemeProvider from '../ThemeProvider';
import MatchStrategyTableView from './MatchStrategyTableView';
import StratCell from './StratCell';

export default class Strategies extends Component {
  state = {
    schedule: null,
    refreshing: true,
    currentMatch: null,
    currentTeams: null,
    nicknames: null,
  };

  componentDidMount() {
    this.getCompetitionName();
    this.refreshSchedule();
  }

  refreshSchedule = async () => {
    this.getCompetitionName();
    let schedule = await ajax.fetchTeamSchedule();
    let nicknames = await ajax.fetchAllTeamNicknamesAtCompetition();
    this.setState({
      schedule: schedule,
      refreshing: false,
      nicknames: nicknames,
    });
  };
  getCompetitionName() {
    ajax.getCompeitionFriendlyName().then(data => {
      this.setState({competitionFriendlyName: data.friendlyName});
    });
  }
  handlePress = (match, teams) => {
    this.setState({currentMatch: match, currentTeams: teams});
  };

  popMatch = () => {
    this.setState({currentMatch: null});
  };

  render() {
    const styles = ThemeProvider.strategiesStyle;
    const bodyStyle = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    };
    if (this.state.currentMatch == null) {
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Header>
              <Body style={bodyStyle}>
                <Title>Strategies</Title>
                <Subtitle>{this.state.competitionFriendlyName}</Subtitle>
              </Body>
            </Header>
            <FlatList
              data={this.state.schedule}
              renderItem={({item}) => (
                <StratCell
                  match={item.match}
                  teams={item.teams}
                  handlePress={this.handlePress}
                  style={styles.stratCellStyle}
                />
              )}
              keyExtractor={(item, index) => String(index)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshSchedule}
                />
              }
              showsVerticalScrollIndicator={true}
              style={styles}
            />
          </Container>
        </StyleProvider>
      );
    } else {
      return (
        <MatchStrategyTableView
          match={this.state.currentMatch}
          nicknames={this.state.nicknames}
          teams={this.state.currentTeams}
          onBack={this.popMatch}
          style={styles}
        />
      );
    }
  }
}
