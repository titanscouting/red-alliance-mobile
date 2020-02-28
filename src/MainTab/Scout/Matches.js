import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, View , BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchList/MatchCell';
import MatchList from './MatchList/MatchList';
import TeamList from './TeamsList/TeamList';
import ajax from '../../ajax'
import { StackActions } from 'react-navigation';
import GLOBAL from '../../GlobalDefinitions'
import Eval from './Evaluation/Eval.js'

export default class Matches extends React.Component {

    _isMounted = false;
    state = {
        matches: [],
        currentMatchNumber: null,

        teams: null,
        currentTeamNumber: null,
        isBlue: null,

        configuration: {}
    }

    async componentDidMount() {
        this._isMounted = true;
        this.refreshMatches();
        this.pullConfiguration();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBack);
    }

    refreshMatches = async () => {
        const matches = await ajax.fetchMatches(GLOBAL.data.competition);
        this.state.matches = matches
        this.forceUpdate()
    }

    refreshTeams = async () => {
        const teams = await ajax.fetchTeamsForMatch(GLOBAL.data.competition, this.state.currentMatchNumber);
        this.state.teams = teams;        
        this.forceUpdate()
    }

    currentMatch = () => {
        return this.matches.find((match) => match.key === this.currentMatchNumber);
    }

    async componentWillUnmount() {
        this._isMounted = false;
        this.backHandler.remove()
    }

    setCurrentMatch = (number) => {
        this.state.currentMatchNumber = number;
        this.state.teams = []
        this.forceUpdate()
        this.refreshTeams();
    }

    unsetCurrentMatch = () => {
        this.state.currentMatchNumber = null;
        this.state.teams = null;
        this.forceUpdate()
    }

    setCurrentTeam = (teamNumber, isBlue) => {
        this.state.currentTeamNumber = teamNumber;
        this.state.isBlue = isBlue;
        this.forceUpdate();
        this.pullConfiguration();
    }
    unsetCurrentTeam = () => {
        this.state.currentTeamNumber = null;
        this.forceUpdate()
    }
    
    pullConfiguration = async () => {
        if (!this.state.configuration || Object.keys(this.state.configuration).length === 0) {
            const config = await ajax.fetchMatchConfig();
            this.setState({configuration: config})
        } 
    }

    popEval = () => {
        this.state.currentTeamNumber = null;
        this.forceUpdate();
    }

    saveScouting = (vals) => {
        console.warn("Saving!")
        console.log(vals);
    }

    render () {
        if (this.state.currentTeamNumber != null) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Eval configuration={this.state.configuration} onBack={this.popEval} onSave={this.saveScouting} matchNumber={this.state.currentMatchNumber} teamNumber={this.state.currentTeamNumber}/>
                </StyleProvider>
                );
        }
        else if (this.state.currentMatchNumber != null) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <TeamList teams={this.state.teams} refreshTeams={this.refreshTeams} matchNumber={this.state.currentMatchNumber} onBack={this.unsetCurrentMatch} onItemPress={this.setCurrentTeam}/>
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
