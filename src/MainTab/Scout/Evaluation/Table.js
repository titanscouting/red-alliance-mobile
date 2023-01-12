import PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native';
import Globals from '../../../GlobalDefinitions';
import Stepper from './Stepper';
import { Col, Row, Grid } from 'react-native-easy-grid'

export default class OurTable extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
  };

  makeCell(row, col) {
    const {row_labels, col_labels} = this.props.options;
    if (col === 0) {
      return <Text>{row_labels[row - 1]}</Text>
    } else if (row === 0) {
      return <Text>{col_labels[col - 1]}</Text>
    } else {
      return <Stepper
            //style={}
            labelBackgroundColor={Globals.colors[Globals.brand.primary]}
            buttonsBackgroundColor={
              Globals.colors[Globals.brand['primary-dark']]
            }
            placeholderText="?"
            onChange={()=>{}}
          />
    }
  }

  render() {
    const {row_labels, col_labels} = this.props.options;
    return <Grid>
      {[...Array(col_labels.length + 1)].map((_, col) => (
        <Col style={{width: col === 0 ? "auto" : null}} key={col}>
          {[...Array(row_labels.length + 1)].map((_, row) => (
            <Row key={row} style={{padding: 2}}>{this.makeCell(row, col)}</Row>
          ))}
        </Col>
      ))}
    </Grid>;
  }
}
