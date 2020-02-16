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

    

    async componentDidMount() {
        // console.log("Component did mount")
        const matches = await ajax.fetchMatches('Central2020');
        GLOBAL.matches = matches;
        // console.log("Matches: "+GLOBAL.matches);
        this.forceUpdate();
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
        else if (GLOBAL.matches) {
            console.log("Has matches");
            return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Content>
                        <MatchList matches = {GLOBAL.matches} onItemPress={GLOBAL.setCurrentMatch}/>
                    </Content>
                </Container>
            </StyleProvider>
            );
        } else {
            console.log("Does not have matches");
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
