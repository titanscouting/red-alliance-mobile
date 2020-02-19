import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../../GlobalColors'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class TeamCell extends React.Component {

    static propTypes = {
        number: PropTypes.number.isRequired,
        isBlue: PropTypes.bool.isRequired,
        isTraditional: PropTypes.bool.isRequired,
        scouterDescription: PropTypes.string.isRequired,
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
                        <View color={this.props.isBlue ? Globals.colors.blue : Globals.colors.red} style={styles.ribbon}/>
                        <View style={styles.row}>
                            <Text style={styles.match} flex={1}>{"Team "+this.props.number}</Text>
                            <Text style={styles.match} flex={1}>{"Covered by "+this.props.scouterDescription}</Text>
                        </View>
                    </View>
               </ListItem>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
  match: {
    color: 'black',
    fontSize: 20,
    flex: 1,
  },
  ribbon: {
    width: 10,
  },
  row: {
    flexDirection: 'row'
  },
  listItem: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 30,
    flex: 1,
    alignItems: 'center',
  }
});
