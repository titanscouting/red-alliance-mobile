import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, RefreshControl, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../../../GlobalDefinitions'
import { TouchableWithoutFeedback } from 'react-native';
import EvalCell from './EvalCell';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view'

export default class EvalTab extends React.Component {

    static propTypes = {
        tabConfig: PropTypes.array.isRequired,
        onUpdate: PropTypes.func.isRequired,
    }

    cellUpdate = (key, value) => {
        this.props.onUpdate(key, value);
    }

     

    render () {
        if (this.props.tabConfig != null) {
            return (
                <KeyboardAwareFlatList
                    data = {this.props.tabConfig}
                    renderItem={({item}) => 
                        <ListItem style={styles.cell}>
                            <Text>{item.name}</Text>
                            <View style={styles.separator}/>
                            <EvalCell config={item} cellUpdate={this.cellUpdate}/>
                        </ListItem>
                    }
                    keyExtractor= {item => String(item.key)}
                    showsVerticalScrollIndicator={false}
                    extraScrollHeight={Platform.OS === "ios" ? 70 : -53}
                />
    
            );
        }
        
    }
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});
