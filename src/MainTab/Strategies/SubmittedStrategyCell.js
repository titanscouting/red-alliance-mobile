import {Card, CardItem, Text} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';

export default class SubmittedStrategyCell extends React.Component {
  static propTypes = {
    scouter: PropTypes.string.isRequired,
    strategy: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
  };

  render() {
    const styles = this.props.style.generic;
    return (
      <Card style={styles}>
        <CardItem header style={styles}>
          <Text bolded style={styles}>
            {this.props.scouter}
          </Text>
        </CardItem>
        <CardItem style={styles}>
          <Text style={styles}>{this.props.strategy}</Text>
        </CardItem>
      </Card>
    );
  }
}
