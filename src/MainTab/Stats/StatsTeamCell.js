import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, ListItem, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView, View , BackHandler, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../GlobalDefinitions';
import ajax from '../../ajax'
export default class StatsTeamCell extends React.Component {

    static propTypes = {
        team: PropTypes.number.isRequired,
        onItemPress: PropTypes.func.isRequired,
        nickname: PropTypes.string,
    }

    state = {
        refreshing: false,
        done: false,
    }

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.checkPit();
        this.setState({refreshing: false});
    }

    checkPit = async () => {
       let d = await ajax.fetchPitData(Globals.data.competition, this.props.team);
       console.log(d);
       if (d != null) {
           this.setState({done: true});
       }
    }
    onBack = () => {
        this.props.onBack(); 
    }

    handlePress = () => {
        this.props.onItemPress(this.props.team)
    }

    getDot = () => {
        if (!this.state.done) {
            return (<View style={styles.ribbon} backgroundColor={Globals.colors[Globals.brand.primary]}/>);
        } else {
            return (<View/>);
        }
    }

    render () {
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <ListItem style={styles.cell}>
                    <Text style={styles.team}>{"Team "+this.props.team}</Text>
                    <Text style={styles.nickname}>{this.props.nickname}</Text>
                    {this.getDot()}
                </ListItem>
                
            </TouchableWithoutFeedback>
        );
        
    }
    
}




const styles = StyleSheet.create({
    ribbon: {
        width: 8,
        height: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
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
  