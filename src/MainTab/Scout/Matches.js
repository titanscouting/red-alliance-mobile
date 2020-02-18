import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchList/MatchCell';
import MatchList from './MatchList/MatchList';

import ajax from '../../ajax'
import { StackActions } from 'react-navigation';


export default class Matches extends React.Component {

    _isMounted = false;

    state = {
        matches: [],
        currentMatchID: null,
        currentTeamID: null,
        currentShotTraditional: null,

    }

    async componentDidMount() {
        this._isMounted = true;
        this.refreshMatches();
        
    }

    refreshMatches = async () => {
        const matches = await ajax.fetchMatches('Central2020'); // TODO: FIX HARDCODING


        if (this._isMounted) {
            this.setState({matches: matches});
        }
    }

    currentMatch = () => {
        return this.matches.find((match) => match.key === this.currentMatchID);
    }

    async componentWillUnmount() {
        console.log("Unmount");
        this._isMounted = false;
    }

    setCurrentMatch = (matchId) => {
        console.log("Match: " +  matchId);
        this.setState({
            currentMatchID: matchId,
        });
    }

    render () {
        if (this.currentShotTraditional) {
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
        else if (this.currentTeamID) {
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
        else if (this.currentMatchID != null) {
            console.log("Current Match ID: " + this.currentMatchID)
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
        else {
            return (
                <StyleProvider style={getTheme(material)}>
                    <MatchList matches = {this.state.matches} onItemPress={this.setCurrentMatch} refreshMatches={this.refreshMatches}/>
                </StyleProvider>
            );
        }

    }
    
}
