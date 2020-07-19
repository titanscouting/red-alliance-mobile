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
import DeviceInfo from 'react-native-device-info';

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
              <Text>The Red Alliance App — v{DeviceInfo.getVersion()}</Text>
            </CardItem>
            <CardItem>
              <Text>Made with ❤️ by Titan Scouting</Text>
            </CardItem>
          </Card>
        </Container>
      </StyleProvider>
    );
  }
}
