import React from 'react';
import { Form, Container, Header, Title, Accordion, TabHeading, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon, Tab, Tabs, ScrollableTab} from 'native-base';

import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import { FlatList, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import EvalTab from './EvalTab';
import { Alert } from "react-native";
import Globals from '../../../GlobalDefinitions'
import ajax from '../../../ajax'

export default class Eval extends React.Component {

    static propTypes = {
        configuration: PropTypes.array.isRequired,
        onSave: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
        matchNumber: PropTypes.number.isRequired,
        teamNumber: PropTypes.number.isRequired,
        isBlue: PropTypes.bool.isRequired,
    }

    vals = {}

    onBack = () => {
        Alert.alert(
            'Continue without saving?',
            'If you go back, the fields will not be saved.',
            [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Continue',
                  onPress: () => {
                      ajax.removeScouterFromMatch(this.props.teamNumber, this.props.matchNumber);
                      this.props.onBack(); 
                  },
                },
            ],
            { cancelable: true },
          );
        
    }


    onSave = () => {
        this.props.onSave(this.vals); 
    }

    doNothing = () => {}

    getTab = (tabNumber) => {
        let tabDict = this.props.configuration[tabNumber];
        let title = Object.keys(tabDict)[0];
        let tab = tabDict[title];
        return [title, tab]
    }

    getTabTitle = (tabNumber) => {
        let [title, tab] = this.getTab(tabNumber);
        return title;
    }

    getTabBody = (tabNumber) => {
        let [title, tab] = this.getTab(tabNumber);
        return tab;
    }

    onUpdate = (key, value) => {
        this.vals[key] = value
    }

    render () {
        if (this.props.configuration.length === 0) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Header color={"#A0A0A0"}>
                            <Body>

                                <Title>{"Team "+this.props.teamNumber+(this.props.isBlue ? " (Blue)" : " (Red)")}</Title>
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
                            <Body style={styles.body}>
                                <View style={this.props.isBlue ? styles.circleBlue : styles.circleRed}/>
                                <Title>Team {this.props.teamNumber}</Title>
                            </Body>

                            <Right>
                                <Button transparent onPress={this.onSave}>
                                     <Icon name='save' />
                                </Button>
                            </Right>
                        </Header>
                        <Tabs>
                            {/* TODO: Remove hardcoding of three tabs. Use scrollable tabs. https://docs.nativebase.io/Components.html#tabs-scrollable-headref */}
                            <Tab heading={ <TabHeading><Text>{this.getTabTitle(0)}</Text></TabHeading>}>
                                <EvalTab tabConfig={this.getTabBody(0)} onUpdate={this.onUpdate}/>
                            </Tab>
                            <Tab heading={ <TabHeading><Text>{this.getTabTitle(1)}</Text></TabHeading>}>
                                <EvalTab tabConfig={this.getTabBody(1)} onUpdate={this.onUpdate}/>
                            </Tab>
                            <Tab heading={ <TabHeading><Text>{this.getTabTitle(2)}</Text></TabHeading>}>
                                <EvalTab tabConfig={this.getTabBody(2)} onUpdate={this.onUpdate}/>
                            </Tab>
                        </Tabs>
                    </Container>
                </StyleProvider>
            );
        }
        
    }
    
}

const styles = StyleSheet.create({
    circleRed: {
        width: 12,
        height: 12,
        borderRadius: 12/2,
        backgroundColor: Globals.colors.red,
        borderWidth: 1,
        borderColor: 'white'
    },
    circleBlue: {
        width: 12,
        height: 12,
        borderRadius: 12/2,
        backgroundColor: Globals.colors.blue,
        borderWidth: 1,
        borderColor: 'white'
    },
    body: {
        flexDirection: 'row',
    },
});