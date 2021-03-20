import {ListItem} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Globals from '../../../GlobalDefinitions';

export default class TeamCell extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    isBlue: PropTypes.bool.isRequired,
    scouterDescription: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    showRefresh: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handlePress = async () => {
    this.props.showRefresh(true);
    await this.props.onPress(this.props.number, this.props.isBlue);
    if (this._isMounted) {
      this.props.showRefresh(false);
    }
  };

  render() {
    const styles = this.props.style.teamCellStyle;
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <ListItem style={styles.cell}>
          <View
            backgroundColor={
              this.props.isBlue ? Globals.colors.blue : Globals.colors.red
            }
            style={styles.ribbon}
          />
          <View width={10} />
          <View style={styles.scouter}>
            <View>
              <Text style={styles.team}>{'Team ' + this.props.number}</Text>
            </View>
            <Text style={styles.scouter}>
              {this.props.scouterDescription
                ? 'Covered by ' + this.props.scouterDescription
                : 'Open'}
            </Text>
          </View>
        </ListItem>
      </TouchableWithoutFeedback>
    );
  }
}
