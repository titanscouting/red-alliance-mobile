import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';
import ajax from '../../ajax'
import GLOBAL from '../../GlobalDefinitions'

export default class Stats extends React.Component {

    _isMounted = false;
    state = {
        teams: [],
        currentTeamNumber: null,
        isBlue: null,
        data: {}
    }

    componentDidMount() {
        this._isMounted = true;
        this.pullTeams();
    }

    pullTeams = async () => {
        const teams = await ajax.fetchCompetitionSchedule(GLOBAL.data.competition);
        console.log(teams)
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
                  <Text>{JSON.stringify(this.state.teams)}</Text>
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
