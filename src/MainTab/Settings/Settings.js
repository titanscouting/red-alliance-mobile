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
import { Linking } from 'react-native';
import ThemeProvider, {refreshTheme} from '../ThemeProvider'; 
import AsyncStorage from '@react-native-community/async-storage';
export default class Settings extends React.Component {
  constructor() {
    super()
    this.state = {darkMode: false}
  }
  toggleDarkMode = async () => {
    let darkMode = !this.state.darkMode; 
    this.setState({darkMode: darkMode});
    try{
      AsyncStorage.setItem('tra-dark-mode', darkMode.toString())
      await refreshTheme()
    } catch (e) {
      console.error("Error setting dark mode: ", e)
    }

  }
  render() {
    const optionsStyle = ThemeProvider.optionsStyle;
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
              <Title>Settings</Title>
            </Body>
          </Header>
          <Card style={optionsStyle}>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>Google Account</Text>
              <Right>
                <Button hasText onPress={() => {ajax.signOut(); this.props.navigation.navigate('Enrollment');}}>
                  <Text>Sign Out</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card style={optionsStyle}>
            <CardItem style={optionsStyle}>
              <Text style={optionsStyle}>Dark Mode (ALPHA)</Text>
              <Right>
                <Button hasText onPress={this.toggleDarkMode}>
                    <Text>{this.state.darkMode ? "Disable": "Enable"}</Text>
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
            <CardItem style={optionsStyle}>
              <Button hasText onPress={() => { Linking.openURL('https://scouting-api.herokuapp.com/privacy-policy');}}>
                  <Text>View Privacy Policy</Text>
              </Button>            
            </CardItem>
          </Card>
        </Container>
      </StyleProvider>
    );
  }
}
