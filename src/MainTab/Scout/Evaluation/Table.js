import PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native';
import Globals from '../../../GlobalDefinitions';
import Stepper from './Stepper';
import { Col, Row, Grid } from 'react-native-easy-grid'

export default class OurTable extends React.Component {
  static propTypes = {
    idkey: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    cellUpdate: PropTypes.func.isRequired,
  };

  onStepperChange(row, col, newVal, oldVal) {
    const {row_labels, col_labels} = this.props.options;
    const key =  this.props.idkey + '-' + row_labels[row - 1].toLowerCase() + '-' + col_labels[col - 1].toLowerCase();
    console.log("Updating", key, "to", newVal);
    this.props.cellUpdate(key, newVal, true);
  }

  makeCell(row, col) {
    const {row_labels, col_labels} = this.props.options;
    if (col === 0) {
      return <Text>{row_labels[row - 1]}</Text>
    } else if (row === 0) {
      return <Text>{col_labels[col - 1]}</Text>
    } else {
      return <Stepper
            labelBackgroundColor={Globals.colors[Globals.brand.primary]}
            buttonsBackgroundColor={
              Globals.colors[Globals.brand['primary-dark']]
            }
            placeholderText="?"
            onChange={this.onStepperChange.bind(this, row, col)}
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
