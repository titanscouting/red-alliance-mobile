import React from 'react';
import { Form, Container, Header, Title, Accordion, TabHeading, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon, Tab, Tabs, ScrollableTab} from 'native-base';


import { FlatList, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView, View , BackHandler, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import ajax from '../../../ajax';


export default class Matches extends React.Component {

    static propTypes = {
        team: PropTypes.number.isRequired,
    }

    componentDidMount() {
        ajax.fetchMatchDataForTeamInCompetition()
    }


    state = {
        refreshing: false,
        statsData: null,
    }

    refreshTeam = async () => {

    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.refreshTeam();
        this.setState({refreshing: false});
    }



    render() {
      return (
        <Container>
            <Text>Matches</Text>
        </Container>
        
      );
    }
  }
  
  