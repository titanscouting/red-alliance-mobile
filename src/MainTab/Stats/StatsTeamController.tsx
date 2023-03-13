import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Tab,
  TabHeading,
  Tabs,
  Text,
  Title,
  Toast,
} from 'native-base';
import React from 'react';
import {Alert, BackHandler, StyleSheet} from 'react-native';
import ajax from '../../ajax';
import Matches from './Tabs/Matches';
import Pit from './Tabs/Pit';
import Analysis from './Tabs/Analysis';
import Metrics from './Tabs/Metrics';
import {Platform} from 'react-native';
import {ToastAndroid} from 'react-native';

interface StatsTeamControllerProps {
  team: number;
  onBack(...args: unknown[]): unknown;
  nickname?: string;
}

export default class StatsTeamController extends React.Component<StatsTeamControllerProps> {
  state = {
    refreshing: false,
    madeChanges: false,
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.props.refreshTeams();
    this.setState({refreshing: false});
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBack,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  acknowledgeChanges = (key, value, human) => {
    this.vals[key] = value;
    if (!this.state.madeChanges && human) {
      this.setState({madeChanges: true});
    }
  };

  onBack = () => {
    if (this.state.madeChanges) {
      Alert.alert(
        'Discard your changes?',
        'If you go back, additional changes to the fields will not be saved.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Discard',
            onPress: () => {
              ajax.removeScouterFromMatch(
                this.props.teamNumber,
                this.props.matchNumber,
              );
              this.props.onBack();
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      this.props.onBack();
    }
  };

  rightButton = () => {
    if (this.state.madeChanges) {
      return (
        <Right>
          <Button transparent onPress={this.onSave}>
            <Icon name="save" />
          </Button>
        </Right>
      );
    } else {
      return (
        <Right style={{justifyContent: 'flex-end', alignItems: 'flex-end'}} />
      );
    }
  };

  vals = {};

  onSave = async () => {
    try {
      await ajax.submitPitData(this.props.team, this.vals);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Pit data submitted!', ToastAndroid.SHORT);
      } else {
        Toast.show({
          text: 'Pit data submitted!',
          type: 'success',
          buttonText: 'OK',
          duration: 2000,
        });
      }
    } catch {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Error submitting data!', ToastAndroid.LONG);
      } else {
        Toast.show({
          text: 'Error submitting data!',
          type: 'warning',
          buttonText: 'OK',
          duration: 2000,
        });
      }
    }
    this.setState({
      currentMatchNumber: null,
      teams: null,
      currentTeamNumber: null,
      isBlue: null,
      madeChanges: false,
    });
    this.forceUpdate();
  };

  render() {
    return (
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
          <Body>
            <Title>{'Team ' + this.props.team}</Title>
            <Title style={styles.subtitle}>{this.props.nickname}</Title>
          </Body>
          {this.rightButton()}
        </Header>
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Text>Matches</Text>
              </TabHeading>
            }>
            <Matches team={this.props.team} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Pit</Text>
              </TabHeading>
            }>
            <Pit
              team={this.props.team}
              onSave={this.saveScouting}
              onBack={this.onBack}
              acknowledgeChanges={this.acknowledgeChanges}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Analysis</Text>
              </TabHeading>
            }>
            <Analysis team={this.props.team} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Rankings</Text>
              </TabHeading>
            }>
            <Metrics team={this.props.team} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  ribbon: {
    width: 15,
    height: 40,
  },
  team: {
    color: 'black',
    fontSize: 18,
    flex: 1,
  },
  type: {
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
  scouter: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cell: {
    flexDirection: 'row',
  },
  subtitle: {
    fontSize: 14,
  },
});
