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
import PropTypes from 'prop-types';
import SubmittedStrategyCell from './SubmittedStrategyCell'

export default class MatchStrategyTableView extends Component {


  static propTypes = {
    match: PropTypes.number.isRequired,
  };
  
  state = {
    strats: null,
    refreshing: true,
    ideas: null,
  }

  componentDidMount() {
    this.refrshStrats();
  }

  refrshStrats = async () => {
    let strats = await ajax.getStrategiesForMatch(Globals.data.competition, this.props.match);
    this.setState({strats: strats, refreshing:false});
  }

  handlePress = (match) => {
    console.warn("Match "+match)
  };


  onSave = async (idea) => {
    await ajax.submitStrategy(Globals.data.competition, this.props.match, idea);
  }


  render() {
      return (
      <StyleProvider style={getTheme(material)}>
        <Container>
         <Header>
            <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                <Title>{"Match "+this.props.match}</Title>
            </Body>
          </Header>
          <FlatList
              data = {this.state.strats}
              renderItem={({item}) => 
                  <SubmittedStrategyCell scouter={item.scouter} strategy={item.strategy}/>
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
    
    
  } 
}
