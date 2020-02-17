import React, { Component } from 'react';
import { Container, Header, Title, Accordion, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet " }
];


export default class Matchups extends Component {
  render() {
    return (
        <Container>
            <Header>
                <Body>
                    <Title>Matchups</Title>
                </Body>
            </Header>
            
        </Container>
      
    );
  }
}

