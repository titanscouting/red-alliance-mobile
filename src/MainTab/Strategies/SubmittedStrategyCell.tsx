import {Card, CardItem, Content, Text} from 'native-base';
import React from 'react';

interface SubmittedStrategyCellProps {
  scouter: string;
  strategy: string;
  style: object;
}

export default class SubmittedStrategyCell extends React.Component<SubmittedStrategyCellProps> {
  render() {
    const styles = this.props.style.generic;
    const weightStyles = {
      boldAndItalic: {fontWeight: 'bold', fontStyle: 'italic'},
    };
    return (
      <Content padder>
        <Card style={styles}>
          <CardItem header style={styles}>
            <Text bolded style={weightStyles.boldAndItalic}>
              {this.props.scouter}
            </Text>
          </CardItem>
          <CardItem style={styles}>
            <Text style={styles}>{this.props.strategy}</Text>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
