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
import { View, Switch, StyleSheet } from "react-native";
import ThemeProvider from '../ThemeProvider'
export default class Options extends React.Component {
  render() {
    const optionsStyle = ThemeProvider.optionsStyle;
    this.state = {enableDarkMode: false}
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
              <Text style={optionsStyle}>Enable Dark Mode</Text>
              <Right>
                <Switch
                  trackColor={{ false: "#000000", true: "#938dd8" }}
                  thumbColor={enableDarkMode ? "#000000" : "#938dd8"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {this.state.enableDarkMode = !this.state.enableDarkMode}}
                  value={this.state.enableDarkMode}
                />
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
