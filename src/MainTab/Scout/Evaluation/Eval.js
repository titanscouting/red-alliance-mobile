import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon, Tab, Tabs, ScrollableTab} from 'native-base';

import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, RefreshControl, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';




export default class Eval extends React.Component {

    static propTypes = {
        configuration: PropTypes.array.isRequired,
        onSave: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
        matchNumber: PropTypes.number.isRequired,
        teamNumber: PropTypes.number.isRequired,
        isBlue: PropTypes.bool.isRequired,
    }

    state = {
        vals: {},
    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.props.refreshTeams();
        this.setState({refreshing: false});
    }

    onBack = () => {
        this.props.onBack(); 
    }

    onSave = () => {
        this.props.onSave(this.state.vals); 
    }

    doNothing = () => {}

    render () {
        if (this.props.configuration.length === 0) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Header color={"#A0A0A0"}>
                            <Body>
                                <Title>Team {this.props.teamNumber}</Title>
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
                                <Title>Team {this.props.teamNumber}</Title>
                            </Body>

                            <Right>
                                <Button transparent onPress={this.onSave}>
                                     <Icon name='save' />
                                </Button>
                            </Right>
                        </Header>
                    </Container>
                </StyleProvider>
            );
        }
        
    }
    
}
