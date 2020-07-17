import React from 'react';
import {Container, Header, Title, StyleProvider, Body} from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';

import {FlatList, RefreshControl, BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchCell';

export default class MatchList extends React.Component {
  static propTypes = {
    matches: PropTypes.array.isRequired,
    refreshMatches: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  state = {
    refreshing: false,
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.props.refreshMatches();
    this.setState({refreshing: false});
  };
  componentDidMount() {
    this.onRefresh();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
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
              // eslint-disable-next-line react-native/no-inline-styles
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Title>Matches</Title>
            </Body>
          </Header>
          <FlatList
            data={this.props.matches}
            renderItem={({item}) => (
              <MatchCell
                number={item.number}
                scouts={item.scouts}
                onPress={this.props.onItemPress}
              />
            )}
            keyExtractor={item => String(item.number)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        </Container>
      </StyleProvider>
    );
  }
}
