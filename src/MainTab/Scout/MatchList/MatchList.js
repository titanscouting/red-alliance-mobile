import {
  Body,
  Container,
  Header,
  StyleProvider,
  Subtitle,
  Title,
} from 'native-base';
import React from 'react';
import {BackHandler, FlatList, RefreshControl} from 'react-native';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import MatchCell from './MatchCell';
import ajax from '../../../ajax';
import {io} from 'socket.io-client';

interface MatchListProps {
  matches: unknown[];
  refreshMatches(...args: unknown[]): unknown;
  onItemPress(...args: unknown[]): unknown;
  style: object;
}

export default class MatchList extends React.Component<MatchListProps> {
  state = {
    refreshing: false,
  };

  onRefresh = async silent => {
    if (silent === undefined) {
      silent = false;
    }
    if (!silent) {
      this.setState({refreshing: true});
    }
    await this.props.refreshMatches();
    await this.getCompetitionName();
    if (!silent) {
      this.setState({refreshing: false});
    }
  };
  async listenScouterChange() {
    this.socket = io('https://scouting.titanrobotics2022.com', {
      transports: ['websocket', 'polling'], // use WebSocket first, if available
    });
    this.socket.on('connect_error', () => {
      // revert to classic upgrade
      this.socket.io.opts.transports = ['polling', 'websocket'];
      console.log('Could not connect to websocket, reverting to polling!');
    });
    this.socket.on('connect', () => {
      this.onRefresh();
    });
    this.socket.on('disconnect', () => {
      this.onRefresh();
    });
    const competition = await ajax.getCurrentCompetition();
    this.setState({competition});
    this.socket.on(`${competition}_scoutChange`, data => {
      this.onRefresh(true);
    });
  }
  componentDidMount() {
    this.getCompetitionName();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this.listenScouterChange();
  }
  async getCompetitionName() {
    const data = await ajax.getCompetitionFriendlyName();
    this.setState({competitionFriendlyName: data.friendlyName});
  }
  componentWillUnmount() {
    this.socket.off(`${this.state.competition}_scoutChange`);
    this.socket.disconnect();
    clearInterval(this.refreshTimer);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackPress = () => {
    this.socket.off(`${this.state.competition}_scoutChange`);
    this.socket.disconnect();
    return true;
  };

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header>
            <Body
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Title>Matches</Title>
              <Subtitle>{this.state.competitionFriendlyName}</Subtitle>
            </Body>
          </Header>
          <FlatList
            data={this.props.matches}
            renderItem={({item}) => (
              <MatchCell
                number={item.number}
                time={item.time}
                scouts={item.scouts}
                onPress={this.props.onItemPress}
                style={this.props.style}
              />
            )}
            keyExtractor={item => String(item.number)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            showsVerticalScrollIndicator={true}
            style={this.props.style}
          />
        </Container>
      </StyleProvider>
    );
  }
}
