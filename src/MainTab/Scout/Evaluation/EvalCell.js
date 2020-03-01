import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../../GlobalDefinitions'
import { TouchableWithoutFeedback } from 'react-native';

export default class EvalCell extends React.Component {

    static propTypes = {
        config: PropTypes.object.isRequired,
        cellUpdate: PropTypes.func.isRequired,
    };

    key = (() => this.props.config.key);
    name = (() => this.props.config.name);
    widget = (() => this.props.config.widget);
    options = (() => this.props.config.options);
 
    
    render () {

        switch (this.widget()) {
            case 'segment': 
                return (
                    <Text>{"Widget: "+this.widget()}</Text>
                );
            default:
                // TODO: Switch this to error.
                console.log("Widget not found: " + this.widget());
                return (
                    <Text>{"Nothing for widget named: " + this.widget()}</Text>
                )
        }
    }
}

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});
