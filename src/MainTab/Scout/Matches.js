import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchList/MatchCell';
import MatchList from './MatchList/MatchList';
import TeamList from './TeamsList/TeamList';
import ajax from '../../ajax'
import { StackActions } from 'react-navigation';
import GLOBAL from '../../GlobalDefinitions'

export default class Matches extends React.Component {

    _isMounted = false;
    state = {
        matches: [],
        currentMatchID: null,

        teams: null,
        currentTeamNumber: null,
        currentIsTraditional: null,

    }

    async componentDidMount() {
        this._isMounted = true;
        this.refreshMatches();
    }

    refreshMatches = async () => {
        const matches = await ajax.fetchMatches(GLOBAL.data.competition);
        if (this._isMounted) {
            this.setState({matches: matches});
        }
    }

    refreshTeams = async () => {
        const teams = await ajax.fetchTeamsForMatch(GLOBAL.data.competition);
        if (this._isMounted) {
            this.setState({teams: teams});
        }
    }

    currentMatch = () => {
        return this.matches.find((match) => match.key === this.currentMatchID);
    }

    async componentWillUnmount() {
        this._isMounted = false;
    }

    setCurrentScoutingPosition = (team, isTraditional) => {
        console.log(team, isTraditional);
        if (this._isMounted) {
            this.setState({
                currentTeamNumber: team,
                currentIsTraditional: isTraditional,
            });
        }
    }

    setCurrentMatch = (matchId) => {
        if (this._isMounted) {
            this.setState({
                currentMatchID: matchId,
                teams: [],
            });
        }
    }

    render () {
        if (this.state.currentShotTraditional) {
            console.log("Oh it did exist");
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Content>
                            <Text>This is currentQualQuant</Text>
                        </Content>
                    </Container>
                </StyleProvider>
                );
        }
        else if (this.state.currentTeamID) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Content>
                            <Text>This is currentTeamID</Text>
                        </Content>
                    </Container>
                </StyleProvider>
                );
        }
        else if (this.state.currentMatchID != null) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <TeamList teams={this.state.teams} refreshItems={this.refreshTeams} onItemPress={this.setCurrentScoutingPosition}/>
                </StyleProvider>
                );
        }
        else {
            return (
                <StyleProvider style={getTheme(material)}>
                    <MatchList matches = {this.state.matches} onItemPress={this.setCurrentMatch} refreshMatches={this.refreshMatches}/>
                </StyleProvider>
            );
        }

    }
    
}
