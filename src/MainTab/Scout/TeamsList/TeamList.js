/* eslint-disable react-native/no-inline-styles */
import {
  Body, Button, Container,
  Header,
  Icon, Left,
  Right, StyleProvider, Title
} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  Alert, BackHandler, FlatList,
  RefreshControl
} from 'react-native';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import TeamCell from './TeamCell';
import ajax from '../../../ajax';
import GlobalDefinitions from '../../../GlobalDefinitions';

export default class TeamList extends React.Component {
  static propTypes = {
    teams: PropTypes.array.isRequired,
    refreshTeams: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    matchNumber: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired
  };

  state = {
    refreshing: false,
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.props.refreshTeams();
    this.setState({refreshing: false});
  };

  onBack = () => {
    this.props.onBack();
  };

  doNothing = (teamNumber) => {
    Alert.alert(
      'Match Already Being Scouted',
      'This match is already being scouted by another user. If you continue, the current scouter will be removed from the match. Are you sure you would like to remove the current scouter?',
      [
        {
          text: 'Yes',
          onPress: () => {
            ajax.removeScouterFromMatch(teamNumber, this.props.matchNumber, GlobalDefinitions.data.competition);
            this.props.onItemPress();
            this.props.refreshTeams();
          },
          style: 'cancel',
        },
        {text: 'No'},
      ],
      {cancelable: false},
    );
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    this.onBack();
    return true;
  };

  showRefresh = serious => {
    this.setState({refreshing: serious});
  };

  render() {
    console.log(this.props.style)
    if (this.props.teams.length === 0) {
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Header>
              <Left
                style={{
                  paddingLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Button transparent onPress={this.onBack}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Title>Match {this.props.matchNumber}</Title>
              </Body>
              <Right
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              />
            </Header>
            <ActivityIndicator animating={true} />
          </Container>
        </StyleProvider>
      );
    } else {
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Header>
              <Left
                style={{
                  paddingLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Button transparent onPress={this.onBack}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Title>Match {this.props.matchNumber}</Title>
              </Body>
              <Right
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              />
            </Header>
            <FlatList
              data={this.props.teams}
              renderItem={({item}) => (
                <TeamCell
                  number={item.teamNumber}
                  isBlue={item.isBlue}
                  scouterDescription={item.scouterDescription}
                  onPress={
                    item.scouterDescription
                      ? this.doNothing.bind(this,item.teamNumber)
                      : this.props.onItemPress
                  }
                  showRefresh={this.showRefresh}
                />
              )}
              keyExtractor={item => String(item.teamNumber)}
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
}
