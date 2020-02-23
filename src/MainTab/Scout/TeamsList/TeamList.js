import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, RefreshControl, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import TeamCell from './TeamCell';

export default class TeamList extends React.Component {

    static propTypes = {
        teams: PropTypes.array.isRequired,
        refreshTeams: PropTypes.func.isRequired,
        onItemPress: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
        matchNumber: PropTypes.string.isRequired,
    }

    state = {
        refreshing: false,
    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.props.refreshTeams();
        this.setState({refreshing: false});
    }

    onBack = () => {
        this.props.onBack(); 
    }

    doNothing = () => {
        console.log("Do nothing!");
    }

    render () {
        if (this.props.teams.length === 0) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Header>
                            <Body>
                                <Title>Match {this.props.matchNumber}</Title>
                            </Body>
                        </Header>
                        <ActivityIndicator animating={true}/>
                    </Container>
                </StyleProvider>
            );
        } else {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Header>
                            <Left>
                                <Button transparent onPress={this.onBack}>
                                     <Icon name='arrow-back' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Match {this.props.matchNumber}</Title>
                            </Body>
                        </Header>
                            <FlatList
                                data = {this.props.teams}
                                renderItem={({item}) => 
                                    <TeamCell number={item.team} isBlue={item.isBlue} scouterDescription={item.scouterDescription} onPress={item.scouterDescription ? this.doNothing : this.props.onItemPress}/>
                                }
                                keyExtractor= {item => String(item.number)}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                                }
                                showsVerticalScrollIndicator={false}
                            />
                    </Container>
                </StyleProvider>
            );
        }
        
    }
    
}
