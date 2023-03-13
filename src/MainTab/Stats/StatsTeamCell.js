import {ListItem, Text} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import ajax from '../../ajax';
import Globals from '../../GlobalDefinitions';

interface StatsTeamCellProps {
  team: number;
  onItemPress(...args: unknown[]): unknown;
  nickname?: string;
  style: object;
}

export default class StatsTeamCell extends React.Component<StatsTeamCellProps> {
  state = {
    refreshing: false,
    done: false,
  };

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.checkPit();
    this.setState({refreshing: false});
  };

  checkPit = async () => {
    let d = await ajax.fetchPitData(this.props.team);
    if (d != null) {
      this.setState({done: true});
    }
  };
  onBack = () => {
    this.props.onBack();
  };

  handlePress = () => {
    this.props.onItemPress(this.props.team);
  };

  getDot = () => {
    const styles = StyleSheet.create(this.props.style.teamCellStyle);
    if (!this.state.done) {
      return (
        <View
          style={styles.ribbon}
          backgroundColor={Globals.colors[Globals.brand.primary]}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    const styles = this.props.style.teamCellStyle;
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <ListItem style={styles.cell}>
          <Text style={styles.team}>{'Team ' + this.props.team}</Text>
          <Text style={styles.nickname}>{this.props.nickname}</Text>
          {this.getDot()}
        </ListItem>
      </TouchableWithoutFeedback>
    );
  }
}
