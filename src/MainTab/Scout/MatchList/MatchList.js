import {
  Body,
  Container,
  Header,
  StyleProvider,
  Subtitle,
  Title,
} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import {BackHandler, FlatList, RefreshControl} from 'react-native';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import MatchCell from './MatchCell';
import ajax from '../../../ajax';

export default class MatchList extends React.Component {
  static propTypes = {
    matches: PropTypes.array.isRequired,
    refreshMatches: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
  };

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
  componentDidMount() {
    this.getCompetitionName();
    this.onRefresh();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    this.refreshTimer = setInterval(() => this.onRefresh(true), 60000);
  }
  async getCompetitionName() {
    const data = await ajax.getCompeitionFriendlyName();
    this.setState({competitionFriendlyName: data.friendlyName});
  }
  componentWillUnmount() {
    clearInterval(this.refreshTimer);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackPress = () => {
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
