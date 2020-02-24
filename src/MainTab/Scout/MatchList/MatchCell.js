import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import { Bar, Pie, Circle, CircleSnail} from 'react-native-progress';
import Globals from '../../../GlobalDefinitions'
import { TouchableOpacity } from 'react-native';

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
            <TouchableOpacity onPress={this.handlePress}>
                <ListItem>
                    <View style={styles.listItem}>
                        <Text style={styles.match}>{"Match "+this.props.number}</Text>
                        <Circle color={Globals["colors"][Globals["brand"]["primary"]]} progress={this.props.scouts / 6.0} formatText={() => this.props.scouts} textStyle={styles.scouts} showsText={true}/>
                    </View>
            </ListItem>
            </TouchableOpacity>

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
