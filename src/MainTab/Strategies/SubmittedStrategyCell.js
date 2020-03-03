import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../GlobalDefinitions'
import { TouchableWithoutFeedback } from 'react-native';

export default class SubmittedStrategyCell extends React.Component {

    static propTypes = {
        scouter: PropTypes.string.isRequired,
        strategy: PropTypes.string.isRequired,
    };

    render () {
        return (
            <Card>
                <Text>{this.props.strategy}</Text>
            </Card>
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
        justifyContent: 'space-between',
    },
    cell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left: {
        flexDirection: 'row',
    },
    right: {
        flexDirection: 'row-reverse'
    }
});
