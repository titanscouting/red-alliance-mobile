import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../../GlobalDefinitions'
import { TouchableWithoutFeedback } from 'react-native';

export default class EvalCell extends React.Component {

    static propTypes = {
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        widget: PropTypes.string.isRequired,
        options: PropTypes.string,
        cellUpdate: PropTypes.func.isRequired,
    };

    
    render () {
        return (
            
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <ListItem style={styles.cell}>
                    <Text>{"Key: "+this.state.key}</Text>
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
