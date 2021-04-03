import {Container, Content, List, ListItem} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native';

export default class Analysis extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  state = {
    data: this.props.data,
    path: [],
  };
  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }
  objType(obj) {
    return Object.prototype.toString
      .call(obj)
      .slice(8, -1)
      .replace(/\s/g, '');
  }
  handleClick(key) {
    this.state.path.push(key);
    this.setState({
      data: this.state.data[key],
      type: this.objType(this.state.data[key]),
    });
    this.forceUpdate();
  }
  handleGoBack() {
    this.state.path.pop();
    this.forceUpdate();
    const lastElement = this.state.path[this.state.path.length - 1];
    if (lastElement !== undefined) {
      let newState = this.props.data;
      for (const item of this.state.path) {
        newState = newState[item];
      }
      this.setState({data: newState});
    } else {
      this.setState({data: this.props.data});
    }
  }
  render() {
    const objType = this.objType(this.state.data);
    switch (objType) {
      case 'Error':
      case 'Object':
        return (
          <Container>
            <Content>
              <List>
                {Object.keys(this.state.data).map((key, index) => {
                  const nonRenderable = ['Object', 'Array'];
                  if (
                    nonRenderable.includes(this.objType(this.state.data[key]))
                  ) {
                    return (
                      <ListItem
                        key={index}
                        button={true}
                        onPress={() => {
                          this.handleClick(key);
                        }}>
                        <Text>
                          {index + 1}: {key}
                        </Text>
                      </ListItem>
                    );
                  } else {
                    return (
                      <ListItem key={index} button={true} onPress={() => {}}>
                        <Text>
                          {key}: {this.state.data[key]}
                        </Text>
                      </ListItem>
                    );
                  }
                })}
                <ListItem
                  key={Object.keys(this.state.data).length}
                  button={true}
                  onPress={() => {
                    this.handleGoBack();
                  }}>
                  <Text>Go Back</Text>
                </ListItem>
              </List>
            </Content>
          </Container>
        );
      case 'Undefined':
        return (
          <Container>
            <ListItem key={0}>
              <Text>No Data</Text>
            </ListItem>
            <ListItem
              key={1}
              button={true}
              onPress={() => {
                this.handleGoBack();
              }}>
              <Text>Go Back</Text>
            </ListItem>
          </Container>
        );
      case 'String':
      case 'Number':
        return (
          <Container>
            <Content>
              <List>
                <ListItem key={0} button={true}>
                  <Text>{this.state.data}</Text>
                </ListItem>
                {this.state.path !== [] ? (
                  <ListItem
                    key={Object.keys(this.state.data).length}
                    button={true}
                    onPress={() => {
                      this.handleGoBack();
                    }}>
                    <Text>Go Back</Text>
                  </ListItem>
                ) : null}
              </List>
            </Content>
          </Container>
        );
      case 'Array':
        return (
          <List>
            {this.state.data.map((key, index) => {
              const nonRenderable = ['Object', 'Array'];
              if (nonRenderable.includes(this.objType(key))) {
                return (
                  <ListItem
                    key={index}
                    button={true}
                    onPress={() => {
                      this.handleClick(key);
                    }}>
                    <Text>
                      {index + 1}: {key}
                    </Text>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem key={index} button={true} onPress={() => {}}>
                    <Text>
                      {index + 1}: {key}
                    </Text>
                  </ListItem>
                );
              }
            })}
            <ListItem
              key={99999}
              button={true}
              onPress={() => {
                this.handleGoBack();
              }}>
              <Text>Go Back</Text>
            </ListItem>
          </List>
        );
      default:
        console.warn('could not render item of type', objType);
        return (
          <List>
            <ListItem key={0} button={true}>
              <Text>{this.state.data} </Text>
            </ListItem>
            <ListItem
              key={1}
              button={true}
              onPress={() => {
                this.handleGoBack();
              }}>
              <Text>Go Back</Text>
            </ListItem>
          </List>
        );
    }
  }
}
