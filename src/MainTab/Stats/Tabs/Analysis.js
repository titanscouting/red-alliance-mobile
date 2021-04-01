import {Container, Text} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';

export default class Analysis extends React.Component {
  static propTypes = {
    team: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  state = {
    refreshing: false,
    statsData: null,
  };

  render() {
    const styles = {
      generic: {
        backgroundColor: '#ffffff',
        color: 'black',
      },
      notYetImplemented: {paddingLeft: 20, paddingTop: 20},
      match: {},
      value: {},
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
      },
    };
    return (
      <Container>
        <Text style={styles.notYetImplemented}>Not yet implemented.</Text>
      </Container>
    );
  }
}
