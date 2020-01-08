import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';


export default class MatchCell extends React.Component {

    static propTypes = {
        number: PropTypes.number.isRequired,
        scouts: PropTypes.number.isRequired,
    };


    render () {
        return (
            
            <ListItem>
                <View style={styles.listItem}>
                    <Text style={styles.match}>{"Match "+this.props.number}</Text>
                    <Text style={styles.scouts}>{"Scouts: "+this.props.scouts+"/12"}</Text>
                </View>
            </ListItem>

        );
    }
}

const styles = StyleSheet.create({
  match: {
    color: 'black',
  },
  scouts: {
    color: 'black',
  },
  listItem: {
      alignContent: 'space-between',
      flexDirection: 'row',
      height: 40,
  }
});
