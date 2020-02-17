import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchCell';
import MatchList from './MatchList';

import ajax from '../../ajax'
import { StackActions } from 'react-navigation';

import GLOBAL from '../../global'

export default class Matches extends React.Component {

    state = {
        matches: [],

    }

    async componentDidMount() {
        this.refreshMatches();
    }

    refreshMatches = async () => {
        console.log("Requested to refresh");
        const matches = await ajax.fetchMatches('Central2020');
        this.setState({matches: matches});
        console.log("The refresh should be over by now");
    }

    currentMatch = () => {
        return GLOBAL.matches.find((match) => match.key === GLOBAL.currentMatchID);
    }

    setCurrentMatch = (matchId) => {
        // GLOBAL.currentMatchID.setState({
        //     currentMatchID: matchId,
        // });
        GLOBAL.currentMatchID = matchId;
    }

    render () {
        if (GLOBAL.currentShotTraditional) {
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
        else if (GLOBAL.currentTeamID) {
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
        else if (GLOBAL.currentMatchID) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Content>
                            <Text>This is currentMatchID</Text>
                        </Content>
                    </Container>
                </StyleProvider>
                );
        }
        else if (this.state.matches) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <MatchList matches = {this.state.matches} onItemPress={GLOBAL.setCurrentMatch} refreshMatches={this.refreshMatches}/>
                </StyleProvider>
            );
        } else {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Content>
                            <ActivityIndicator size="large"/>
                        </Content>
                    </Container>
                </StyleProvider>
            );
        }

    }
    
}
