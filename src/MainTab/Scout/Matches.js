import React from 'react';
import { Container, Header, Title, Accordion, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, ActivityIndicator, StyleSheet, View } from 'react-native';
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
                    <ActivityIndicator size="large" color="#0000ff"/>
                </Content>
            </Container>
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
            <Container>
                <Content>
                    <FlatList
                        data = {this.state.matches}
                        renderItem={({item}) => <MatchCell number={item.number} scouts={item.scouts}/>}
                        keyExtractor= {item => String(item.number)}
                    />
                </Content>
            </Container>
        );
    }
    
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  