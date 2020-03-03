import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../GlobalDefinitions'
import { TouchableWithoutFeedback } from 'react-native';

export default class TeamCell extends React.Component {

    static propTypes = {
        match: PropTypes.number.isRequired,
        teams: PropTypes.array.isRequired,
        handlePress: PropTypes.func.isRequired,
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handlePress = async () => {
        this.props.handlePress(this.props.match);
        
    };

    render () {
        return (
            
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <ListItem style={styles.cell}>
                <View style={styles.left}>
                    <View backgroundColor={Globals.colors.blue} style={styles.ribbon}/>
                    <View width={5}/>
                    <View style={styles.blue}>
                        <Text style={styles.type}>{"Team "+this.props.teams[0]}</Text>
                        <Text style={styles.type}>{"Team "+this.props.teams[1]}</Text>
                        <Text style={styles.type}>{"Team "+this.props.teams[2]}</Text>
                    </View>
                </View>
                <Text style={styles.match}>{"Match "+this.props.match}</Text>
                <View style={styles.right}>
                    <View backgroundColor={Globals.colors.red} style={styles.ribbon}/>
                    <View width={5}/>
                    <View style={styles.blue}>
                        <Text style={styles.type}>{"Team "+this.props.teams[3]}</Text>
                        <Text style={styles.type}>{"Team "+this.props.teams[4]}</Text>
                        <Text style={styles.type}>{"Team "+this.props.teams[5]}</Text>
                    </View>
                </View>
               </ListItem>
            </TouchableWithoutFeedback>
            
        );
    }
}

const styles = StyleSheet.create({
    ribbon: {
        width: 10,
        height: 60,
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
    match: {
      color: 'black',
      fontSize: 20,
    },
    blue: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left: {
        flexDirection: 'row',
    },
    right: {
        flexDirection: 'row-reverse'
    }
});
