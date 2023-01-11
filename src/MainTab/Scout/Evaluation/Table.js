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
    if (col === 0) {
      if (row==1) {
        return <Text>Low</Text>;  
      } else if (row==2) {
        return <Text>Med</Text>;
      } else if (row==3) {
        return <Text>High</Text>; 
      } else 
        return <Text></Text>;
    } else if (row === 0) {
      if (col == 1) {
        return <Text>Cones</Text>; 
      } else if (col == 2) {
        return <Text>Cubes</Text>;
      } else 
        return <Text></Text>;
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
    return <Grid>
      {[...Array(3)].map((_, col) => (
        <Col style={{width: col === 0 ? "auto" : null}} key={col}>
          {[...Array(4)].map((_, row) => (
            <Row key={row} style={{padding: 2}}>{this.makeCell(row, col)}</Row>
          ))}
        </Col>
      ))}
    </Grid>;
  }
}
