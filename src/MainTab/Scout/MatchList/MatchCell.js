import { ListItem } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Circle } from 'react-native-progress';
import Globals from '../../../GlobalDefinitions';

export default class MatchCell extends React.Component {

    static propTypes = {
        number: PropTypes.number.isRequired,
        scouts: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    handlePress = () => {
        this.props.onPress(this.props.number);
    };

    render () {
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <ListItem>
                    <View style={styles.listItem}>
                        <Text style={styles.match}>{"Match "+this.props.number}</Text>
                        <Circle color={Globals["colors"][Globals["brand"]["primary"]]} progress={this.props.scouts / 6.0} formatText={() => this.props.scouts} textStyle={styles.scouts} showsText={true}/>
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
  }
});
