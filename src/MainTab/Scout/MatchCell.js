import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import { Bar, Pie, Circle, CircleSnail} from 'react-native-progress';

export default class MatchCell extends React.Component {

    static propTypes = {
        number: PropTypes.number.isRequired,
        scouts: PropTypes.number.isRequired,
    };

    // TODO: FIX HARDCODED 12 SCOUTS
    render () {
        return (
            
            <ListItem>
                <View style={styles.listItem}>
                    <Text style={styles.match}>{"Match "+this.props.number}</Text>
                    <Text style={styles.scouts}>{"Scouts"}</Text>
                    <Circle progress={this.props.scouts / 12.0} formatText={() => this.props.scouts + "/12"} extStyle={styles.scouts} showsText={true}/>
                </View>
            </ListItem>

        );
    }
}

const styles = StyleSheet.create({
  match: {
    color: 'black',
    fontFamily: "Proxima Nova",
    fontSize: 20,
  },
  scouts: {
    color: 'black',
    fontFamily: "Proxima Nova",
    fontSize: 20,
  },
  listItem: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  }
});
