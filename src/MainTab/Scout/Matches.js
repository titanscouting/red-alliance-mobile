import React from 'react';
import { Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchCell';


import ajax from '../../ajax'
import { StackActions } from 'react-navigation';


export default class Matches extends React.Component {

    
    state = {
        matches: [],
        currentMatchID: null,
    };

    // this.props.navigation.dispatch(pushAction);

    async componentDidMount() {
        const matches = await ajax.fetchMatches('2022', 'Central 2019');
        this.setState({ matches })
    }

    

    render () {
        if (this.state.matches.length === 0) {
            return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Content>
                        <ActivityIndicator size="large"/>
                    </Content>
                </Container>
            </StyleProvider>
            )
        } else {
            console.log("MATCHES: ");
            console.log(this.state.matches);
        }

        const pushAction = StackActions.push({
            routeName: 'Teams',
            params: {
              myUserId: 9,
            },
          });
          
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>

                    <Header searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" />
                            <Icon name="ios-people" />
                        </Item>
                        <Button transparent>
                            <Text>Search</Text>
                        </Button>
                    </Header>
                    <Content>
                        <FlatList
                            data = {this.state.matches}
                            renderItem={({item}) => <MatchCell number={item.number} scouts={item.scouts}/>}
                            keyExtractor= {item => String(item.number)}
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
    
}
