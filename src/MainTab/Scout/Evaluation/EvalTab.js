import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, RefreshControl, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../../GlobalDefinitions'
import { TouchableWithoutFeedback } from 'react-native';
import EvalCell from './EvalCell.js';

export default class EvalTab extends React.Component {

    static propTypes = {
        tabConfig: PropTypes.array.isRequired,
        onUpdate: PropTypes.func.isRequired,
    }

    cellUpdate = (key, value) => {
        this.props.onUpdate(key, value);
    }

    render () {
        return (
            
            <FlatList
                data = {this.props.tabConfig}
                renderItem={({item}) => 
                    <EvalCell key={item.key} name={item.name} widget={item.widget} options={item.options} onUpdate={this.cellUpdate}/>
                }
                keyExtractor= {item => String(item.key)}
                showsVerticalScrollIndicator={false}
            />

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
