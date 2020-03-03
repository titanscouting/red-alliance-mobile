import React, { Component } from 'react';
import { Container, StyleProvider, Header, Title, Accordion, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import { RefreshControl, FlatList } from 'react-native'
import StratCell from './StratCell'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet " }
];

import ajax from '../../ajax'
import Globals from '../../GlobalDefinitions'
import MatchStrategyTableView from './MatchStrategyTableView'

export default class Strategies extends Component {


  state = {
    schedule: null,
    refreshing: true,
    currentMatch: null,
  }

  componentDidMount() {
    this.refreshSchedule();
  }

  refreshSchedule = async () => {
    let schedule = await ajax.fetch2022Schedule(Globals.data.competition);
    
    this.setState({schedule: schedule, refreshing:false});
  }

  handlePress = (match) => {
    this.setState({currentMatch:match});
    this.refreshStrats();
  }

  refreshStrats = async () => {
    let match = this.state.currentMatch;
  }

  onSave = (idea) => {
    ajax.submi
  }

  render() {
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
                                  <StratCell match={item.match} teams={item.teams} handlePress={this.handlePress}/>
                              }
                              keyExtractor= {(item, index) => String(index)}
                              refreshControl={
                                  <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshSchedule} />
                              }
                              showsVerticalScrollIndicator={false}
                          />
        </Container>
        </StyleProvider>
      );
    } else {
      return (
        <MatchStrategyTableView match={this.state.currentMatch}/>
      )
      
    }
      
    
    
  } 
}
