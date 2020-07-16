import React, {Component} from 'react';
import {
  Container,
  Card,
  CardItem,
  StyleProvider,
  Header,
  Title,
  Content,
  Button,
  Right,
  Body,
  Text,
} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import ajax from '../../ajax';
import Globals from '../../GlobalDefinitions';

export default class Strategies extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header>
            <Body
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Title>Options</Title>
            </Body>
          </Header>
          <Content>
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
                <Text>Red Alliance Mobile App - v{Globals.data.version}</Text>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
