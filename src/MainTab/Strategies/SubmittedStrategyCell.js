import React from 'react';
import { Text, Card, CardItem } from 'native-base';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class SubmittedStrategyCell extends React.Component {

    static propTypes = {
        scouter: PropTypes.string.isRequired,
        strategy: PropTypes.string.isRequired,
    };

    render () {
        return (
            <Card>
                <CardItem header>
                    <Text bolded>{this.props.scouter}</Text>
                </CardItem>
                <CardItem>
                    <Text>{this.props.strategy}</Text>
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
