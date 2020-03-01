import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, ListItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, RefreshControl, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import ajax from '../../ajax'
import GLOBAL from '../../GlobalDefinitions'

export default class Stats extends React.Component {

    _isMounted = false;
    state = {
        teams: null,
        currentTeamNumber: null,
        isBlue: null,
        data: {}
    }

    componentDidMount() {
        this._isMounted = true;
        this.pullTeams();
    }

    pullTeams = async () => {
        const teams = await ajax.fetchTeamsInCompetition(GLOBAL.data.competition);
        this.setState({teams: teams});
    }

    async componentWillUnmount() {
        this._isMounted = false;
    }

    setCurrentTeam = (number) => {
        this.setState({currentTeamNumber: number});
    }
    removeCurrentTeam = () => {
        this.setState({currentTeamNumber: null});
    }

    render () {
        if (this.state.currentTeamNumber != null) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Text>{this.state.currentTeamNumber}</Text>
                </StyleProvider>
                );
        } else if (this.state.teams != null) {
          return (
            <StyleProvider style={getTheme(material)}>
              <Container>
                  <Header>
                      <Body>
                        <Title>Stats</Title>
                      </Body>
                  </Header>
                  <FlatList
                      data = {this.state.teams}
                      renderItem={({item}) => 
                        <TouchableWithoutFeedback onPress={this.setCurrentTeam}>
                          <ListItem style={styles.cell}>
                              <Text style={styles.team}>{"Team "+item}</Text>
                          </ListItem>
                        </TouchableWithoutFeedback>
                      }
                      keyExtractor= {item => String(item)}
                      refreshControl={
                          <RefreshControl refreshing={this.state.teams.length === 0} onRefresh={this.pullTeams} />
                      }
                      showsVerticalScrollIndicator={false}
                  />
              </Container>
          </StyleProvider>
          )
          
        } else {
            return (
                <StyleProvider style={getTheme(material)}>
                  <Container>
                      <Header>
                          <Body>
                            <Title>Stats</Title>
                          </Body>
                      </Header>
                      <ActivityIndicator animating={true}/>
                  </Container>
              </StyleProvider>
            );
        }

    }
    
}

const styles = StyleSheet.create({
  ribbon: {
      width: 15,
      height: 40,
  },
  team: {
    color: 'black',
    fontSize: 18,
    flex: 1,
  },
  type: {
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
  scouter: {
      flexDirection: 'column',
      justifyContent: 'space-between',
  },
  cell: {
      flexDirection: 'row'
  }
});
