import {
  Body,
  Button, Card,
  CardItem, Container, Header,
  Right, StyleProvider,
  Text, Title
} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VersionCheck from 'react-native-version-check';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';

export default class Options extends React.Component {
  render() {
    const isDarkMode = true;
    const optionsStyle= isDarkMode ? {
      backgroundColor: "#121212",
      color: "white",
    } : {
      backgroundColor: "#ffffff",
      color: "black",
    } 
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={optionsStyle}>
          <Header>
            <Body
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Title>Options</Title>
            </Body>
          </Header>
          <Card style={optionsStyle}>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>Google Account</Text>
              <Right>
                <Button hasText onPress={ajax.signOut}>
                  <Text>Switch User</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card style={optionsStyle}>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>
                The Red Alliance App — v{VersionCheck.getCurrentVersion()} (
                {VersionCheck.getCurrentBuildNumber()})
              </Text>
            </CardItem>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>
                Made with <Icon name="cards-heart" size={15} color="#FF0000" />{' '}
                by Titan Scouting
              </Text>
            </CardItem>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>Copyright Titan Scouting 2020. All rights reserved.</Text>
            </CardItem>
          </Card>
        </Container>
      </StyleProvider>
    );
  }
}
