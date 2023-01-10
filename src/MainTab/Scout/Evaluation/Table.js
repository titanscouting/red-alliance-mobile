import PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native';

export default class OurTable extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
  };

  render() {
    return <Text>{'Table implemented'}</Text>;
  }
}
