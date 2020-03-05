import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../GlobalDefinitions'
import { TouchableWithoutFeedback } from 'react-native';

export default class MatchStrategyHeader extends React.Component {

    static propTypes = {
        teams: PropTypes.array.isRequired,
        nicknames: PropTypes.object,
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getCellText = (index) => {
        const nick = this.props.nicknames[this.props.teams[index]];
        const team = this.props.teams[index];
        if (nick) {
            return team + " - " + nick;
        }
        return team;
    } 

    render () {
        return (
            
            <ListItem style={styles.cell}>
            <View style={styles.left}>
                <View backgroundColor={Globals.colors.blue} style={styles.ribbon}/>
                <View width={5}/>
                <View style={styles.blue}>
                    <Text style={styles.type}>{this.getCellText(0)}</Text>
                    <Text style={styles.type}>{this.getCellText(1)}</Text>
                    <Text style={styles.type}>{this.getCellText(2)}</Text>
                </View>
            </View>
            <View style={styles.right}>
                <View backgroundColor={Globals.colors.red} style={styles.ribbon}/>
                <View width={5}/>
                <View style={styles.blue}>
                    <Text style={styles.type}>{this.getCellText(3)}</Text>
                    <Text style={styles.type}>{this.getCellText(4)}</Text>
                    <Text style={styles.type}>{this.getCellText(5)}</Text>
                </View>
            </View>
            </ListItem>
            
        );
    }
}

const styles = StyleSheet.create({
    ribbon: {
        width: 10,
        height: 60,
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
    match: {
      color: 'black',
      fontSize: 20,
    },
    blue: {
        flexDirection: 'column',
    },
    cell: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    left: {
        flexDirection: 'row',
    },
    right: {
        paddingTop: 10,
        flexDirection: 'row',
        textAlign: 'right',
    }
});
