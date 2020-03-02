import React from 'react';
import { Form, Container, Header, Separator, Title, Accordion, TabHeading, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon, Tab, Tabs, ScrollableTab} from 'native-base';


import { FlatList, StyleSheet, SectionList, ActivityIndicator, RefreshControl, SafeAreaView, View , BackHandler, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import ajax from '../../../ajax';
import Globals from '../../../GlobalDefinitions';
import Eval from './Evaluation/Eval'

export default class Pit extends React.Component {

    static propTypes = {
        team: PropTypes.number.isRequired,
        onBack: PropTypes.func.isRequired,
    }

    componentDidMount() {
       this.refreshTeam();
    }


    state = {
        refreshing: false,
        configuration: null,
        defaultData: null,
    }

    refreshTeam = async () => {
       let d = await ajax.fetchPitData(Globals.data.competition, this.props.team);
        let c = await ajax.fetchPitConfiguration();
       this.setState({defaultData: d, configuration: c});
    }



    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.refreshTeam();
        this.setState({refreshing: false});
    }

    saveScouting = (vals) => {
        ajax.submitPitData(GLOBAL.data.competition, this.state.currentTeamNumber, vals);
        this.setState({
            currentMatchNumber: null,
            teams: null,
            currentTeamNumber: null,
            isBlue: null,
        })
        this.forceUpdate();
        console.log("Save scouting: "+JSON.stringify(vals));
    }

    render() {
        if (this.state.defaultData === null || this.state.configuration === null) {
            return (
            <Container>
                <ActivityIndicator animating={true}/>
            </Container>
            );
        } else {
            return (
            <Container>
                    <Eval configuration={this.state.configuration} 
                            defaultData={this.state.defaultData} 
                            onBack={this.propTypes.onBack} 
                            onSave={this.saveScouting} 
                            teamNumber={this.state.currentTeamNumber} />
            </Container>
            );
        }
    }
  }
  
  