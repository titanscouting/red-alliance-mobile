import {ListItem} from 'native-base';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Circle} from 'react-native-progress';
import Globals from '../../../GlobalDefinitions';
import ThemeProvider from '../../ThemeProvider';

interface MatchCellProps {
  number: number;
  time: string;
  scouts: number;
  onPress(...args: unknown[]): unknown;
  style: object;
}

export default class MatchCell extends PureComponent<MatchCellProps> {
  handlePress = () => {
    this.props.onPress(this.props.number);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <ListItem>
          <View style={styles.listItem}>
            <Text style={ThemeProvider.matchesStyle.cellStyle}>
              {'Match ' + this.props.number}
            </Text>
            <Text>{this.props.time}</Text>
            <Circle
              color={Globals.colors[Globals.brand.primary]}
              progress={this.props.scouts / 6.0}
              formatText={() => this.props.scouts}
              textStyle={styles.scouts}
              showsText={true}
            />
          </View>
        </ListItem>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  match: {
    color: 'black',
    // fontFamily: "Proxima Nova",
    fontSize: 20,
  },
  scouts: {
    fontSize: 16,
  },
  listItem: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
    flex: 1,
    alignItems: 'center',
  },
});
