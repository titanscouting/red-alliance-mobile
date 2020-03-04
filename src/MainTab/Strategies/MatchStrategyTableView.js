import React, { Component } from 'react';
import { Container, Form, Textarea, StyleProvider, Header, Title, Accordion, View, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import { RefreshControl, FlatList, StyleSheet} from 'react-native'
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
    onBack: PropTypes.func.isRequired,
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


  onSave = async (idea) => {
    await ajax.submitStrategy(Globals.data.competition, this.props.match, idea);
  }

  theList = () => {
    return (<FlatList
      data = {this.state.strats}
      renderItem={({item}) => 
          <SubmittedStrategyCell scouter={item.scouter} strategy={item.data}/>
      }
      keyExtractor= {(item, index) => String(index)}
      refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refrshStrats} />
      }
      showsVerticalScrollIndicator={false}
  />);
  }
  renderStrategyList = () => {
    if (this.state.strats == null) {
      return this.theList();
    } else if (this.state.strats.length === 0){
      return <View style={styles.noStrats}><Text>No submitted strategies</Text></View>
    }
    return this.theList();
  }

  render() {
      return (
      <StyleProvider style={getTheme(material)}>
        <Container>
         <Header>
            <Left style={{ paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Button transparent onPress={this.props.onBack}>
                      <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body >
                <Title>{"Match "+this.props.match}</Title>
            </Body>

            <Right></Right>
          </Header>
          <Form style={styles.textarea}>
              <Item style={styles.textarea}>
                <Textarea style={styles.textarea} rowSpan={3} bordered placeholder={"Detail your own match strategy here. What should we do with each of the teams?"} onChangeText={this.handleGeneralChange} />
              </Item>
          </Form>
          {this.renderStrategyList()}
        </Container>
      </StyleProvider>
    );
    
    
  } 
}

const styles = StyleSheet.create({
  noStrats: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  stepper: {
    flex: 1,
  },
  tabStyle: {
    borderColor: Globals.colors[Globals.brand.primary],
  },
  activeTabStyle: {
    backgroundColor: Globals.colors[Globals.brand.primary],
  },
  tabTextStyle: {
    color: Globals.colors[Globals.brand.primary],
  },
  textarea: {
      flex: 1,
      flexDirection: 'row',
  }
});