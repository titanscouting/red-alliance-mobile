import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, ListItem, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';


import { FlatList, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView, View , BackHandler, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

export default class StatsTeamCell extends React.Component {

    static propTypes = {
        team: PropTypes.number.isRequired,
        onItemPress: PropTypes.func.isRequired,
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

    handlePress = () => {
        this.props.onItemPress(this.props.team)
    }

    render () {
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <ListItem style={styles.cell}>
                    <Text style={styles.team}>{"Team "+this.props.team}</Text>
                </ListItem>
            </TouchableWithoutFeedback>
        );
        
    }
    
}




const styles = StyleSheet.create({
    ribbon: {
        width: 15,
        height: 40,
    },
    team: {
      color: 'black',
      fontSize: 18,
      flex: 1,
    },
    type: {
      color: 'black',
      fontSize: 16,
      flex: 1,
    },
    scouter: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cell: {
        flexDirection: 'row'
    }
  });
  