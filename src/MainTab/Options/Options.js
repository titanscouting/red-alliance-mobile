import React from 'react';
import {
  StyleProvider,
  Header,
  Body,
  Title,
  Container,
  Card,
  CardItem,
  Text,
  Right,
  Button,
} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';
import VersionCheck from 'react-native-version-check';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Options extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
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
          <Card>
            <CardItem>
              <Text>Google Account</Text>
              <Right>
                <Button hasText onPress={ajax.signOut}>
                  <Text>Switch User</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>
                The Red Alliance App — v{VersionCheck.getCurrentVersion()} (
                {VersionCheck.getCurrentBuildNumber()})
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Made with <Icon name="cards-heart" size={15} color="#FF0000" />{' '}
                by Titan Scouting
              </Text>
            </CardItem>
            <CardItem>
              <Text>Copyright Titan Scouting 2020. All rights reserved</Text>
            </CardItem>
          </Card>
        </Container>
      </StyleProvider>
    );
  }
}
