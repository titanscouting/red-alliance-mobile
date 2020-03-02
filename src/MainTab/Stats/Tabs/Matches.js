import React from 'react';
import { Form, Container, Header, Title, Accordion, TabHeading, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon, Tab, Tabs, ScrollableTab} from 'native-base';


import { FlatList, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView, View , BackHandler, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import ajax from '../../../ajax';
import Globals from '../../../GlobalDefinitions';

export default class Matches extends React.Component {

    static propTypes = {
        team: PropTypes.number.isRequired,
    }

    componentDidMount() {
       this.refreshTeam();
    }


    state = {
        refreshing: false,
        statsData: null,
    }

    refreshTeam = async () => {
       let d = await ajax.fetchMatchDataForTeamInCompetition(Globals.data.competition, this.props.team);
       this.setState({statsData: d});
    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.refreshTeam();
        this.setState({refreshing: false});
    }

    render() {
        if (this.state.statsData === null) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <ActivityIndicator animating={true}/>
                    </Container>
                </StyleProvider>
            );
        } else {
            return (
                    <Container>
                        <FlatList
                            data = {this.props.teams}
                            renderItem={({item}) => 
                                <TeamCell number={item.teamNumber} isBlue={item.isBlue} scouterDescription={item.scouterDescription} onPress={item.scouterDescription ? this.doNothing : this.props.onItemPress} showRefresh={this.showRefresh}/>
                            }
                            keyExtractor= {item => String(item.teamNumber)}
                            refreshControl={
                                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                            }
                            showsVerticalScrollIndicator={false}
                        />
                    </Container>
            );
        }
    }
  }
  
  