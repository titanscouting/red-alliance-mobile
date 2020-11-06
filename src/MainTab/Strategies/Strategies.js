import { Body, Container, Header, StyleProvider, Title } from 'native-base';
import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';
import Globals from '../../GlobalDefinitions';
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
  }

  componentDidMount() {

    this.refreshSchedule();
  }

  refreshSchedule = async () => {
    let schedule = await ajax.fetch2022Schedule(Globals.data.competition);
    let nicknames = await ajax.fetchAllTeamNicknamesAtCompetition(Globals.data.competition);
    this.setState({schedule: schedule, refreshing:false, nicknames: nicknames});
  }

  handlePress = (match, teams) => {
    this.setState({currentMatch:match, currentTeams: teams});
  }


  popMatch = () => {
    this.setState({currentMatch: null});
  }

  render() {
    const styles = ThemeProvider.strategiesStyle
    if (this.state.currentMatch == null) {
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
          <Header>
              <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                  <Title>Strategies</Title>
              </Body>
            </Header>
            <FlatList
              data = {this.state.schedule}
              renderItem={({item}) => 
                  <StratCell match={item.match} teams={item.teams} handlePress={this.handlePress} style={styles.stratCellStyle}/>
              }
              keyExtractor= {(item, index) => String(index)}
              refreshControl={
                  <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshSchedule} />
              }
              showsVerticalScrollIndicator={false}
              style={styles}
            />
          </Container>
        </StyleProvider>
      );
    } else {
      return (
        <MatchStrategyTableView match={this.state.currentMatch} nicknames={this.state.nicknames} teams={this.state.currentTeams} onBack={this.popMatch} style={styles}/>
      )
      
    }
      
    
    
  } 
}
