import { Card, CardItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';

export default class SubmittedStrategyCell extends React.Component {

    static propTypes = {
        scouter: PropTypes.string.isRequired,
        strategy: PropTypes.string.isRequired,
        style: PropTypes.object.isRequired
    };

    render () {
        const styles = this.props.style.generic
        return (
            <Card style={styles}>
                <CardItem header style={styles}>
                    <Text bolded style={styles}>{this.props.scouter} (scouted team {this.props.team_scouted})</Text>
                </CardItem>
                <CardItem style={styles}>
                    <Text style={styles}>{this.props.strategy}</Text>
                </CardItem>

            </Card>
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
