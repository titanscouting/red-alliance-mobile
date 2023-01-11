import PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native';
import { CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'

export default class OurTable extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
  };

  render() {
    return <Grid>
      {[...Array(9)].map((_, col) => (
        <Col>
          {[...Array(3)].map((_, row) => (
            <Row style={{aspectRatio: 1}}>
              <CheckBox style={{width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}} color={col / 3 % 2 < 1 ? "red" : "gray"} />
            </Row>
          ))}
        </Col>
      ))}
    </Grid>;
  }
}
