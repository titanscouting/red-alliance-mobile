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
        currentMatchNumber: null,

        teams: null,
        currentTeamNumber: null,

    }

    async componentDidMount() {
        this._isMounted = true;
        this.refreshMatches();
    }

    refreshMatches = async () => {
        const matches = await ajax.fetchMatches(GLOBAL.data.competition);
        this.setState({matches: matches});
        this.state.matches = matches
    }

    refreshTeams = async () => {
        console.error(this.state.currentMatchNumber)
            const teams = await ajax.fetchTeamsForMatch(GLOBAL.data.competition, this.state.currentMatchNumber);
            this.state.teams = teams;        
            this.forceUpdate()
    }

    currentMatch = () => {
        return this.matches.find((match) => match.key === this.currentMatchNumber);
    }

    async componentWillUnmount() {
        this._isMounted = false;
    }

    setCurrentScoutingPosition = (team) => {
        this.setState({
            currentTeamNumber: team,
        });
        this.state.currentTeamNumber = team;
    }

    setCurrentMatch = (number) => {
        console.log(number);
        this.setState({
            currentMatchNumber: number,
            teams: [],
        });
        this.state.currentMatchNumber = number;
        this.state.teams = []
        console.log(this.state.currentMatchNumber);
        this.refreshTeams();
    }

    unsetCurrentMatch = () => {
        this.setState({
            currentMatchNumber: null,
            teams: null,
        });
        this.state.currentMatchNumber = null;
        this.state.teams = null;
    }

    setCurrentTeam = (teamNumber) => {
        this.setState({
            currentTeamNumber: teamNumber,
            configuration: [],
        });
        this.state.currentTeamNumber = teamNumber;
        this.state.configuration = []
        this.pullConfiguration();
    }
    unsetCurrentTeam = () => {
        this.setState({
            currentTeamNumber: null,
        });
        this.state.currentTeamNumber = null;
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
        else if (this.state.currentTeamNumber != null) {
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
        else if (this.state.currentMatchNumber != null) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <TeamList teams={this.state.teams} refreshTeams={this.refreshTeams} matchNumber={this.state.currentMatchNumber} onBack={this.unsetCurrentMatch} onItemPress={this.setCurrentScoutingPosition}/>
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
