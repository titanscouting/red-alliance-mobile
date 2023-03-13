import {ListItem} from 'native-base';
import React from 'react';
import {Text, View} from 'react-native';
import Globals from '../../GlobalDefinitions';

interface MatchStrategyHeaderProps {
  teams: unknown[];
  nicknames?: object;
  style: object;
}

export default class MatchStrategyHeader extends React.Component<MatchStrategyHeaderProps> {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getCellText = index => {
    const nick = this.props.nicknames[this.props.teams[index]];
    const team = this.props.teams[index];
    if (nick) {
      return team + ' - ' + nick;
    }
    return team;
  };

  render() {
    const styles = this.props.style.headerStyle;
    return (
      <ListItem style={styles.cell}>
        <View style={styles.left}>
          <View backgroundColor={Globals.colors.blue} style={styles.ribbon} />
          <View width={5} />
          <View style={styles.blue}>
            <Text style={styles.type}>{this.getCellText(0)}</Text>
            <Text style={styles.type}>{this.getCellText(1)}</Text>
            <Text style={styles.type}>{this.getCellText(2)}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <View backgroundColor={Globals.colors.red} style={styles.ribbon} />
          <View width={5} />
          <View style={styles.blue}>
            <Text style={styles.type}>{this.getCellText(3)}</Text>
            <Text style={styles.type}>{this.getCellText(4)}</Text>
            <Text style={styles.type}>{this.getCellText(5)}</Text>
          </View>
        </View>
      </ListItem>
    );
  }
}
