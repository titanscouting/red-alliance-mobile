import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchCell';


import ajax from '../../ajax'
import { StackActions } from 'react-navigation';
import GLOBAL from '../../global';

export default class MatchList extends React.Component {

    
    render () {
          
        return (
            <StyleProvider style={getTheme(material)}>
               
                <Container>
                    <Header>
                        <Body>
                            <Title>Matches</Title>
                        </Body>
                    </Header>
                    <Content>
                        <FlatList
                            data = {GLOBAL.matches}
                            renderItem={({item}) => <MatchCell number={item.number} scouts={item.scouts}/>}
                            keyExtractor= {item => String(item.number)}
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
    
}
