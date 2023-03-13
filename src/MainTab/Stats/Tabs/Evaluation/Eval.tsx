import {Container, StyleProvider} from 'native-base';
import React from 'react';
import {ActivityIndicator, BackHandler} from 'react-native';
import getTheme from '../../../../../native-base-theme/components';
import material from '../../../../../native-base-theme/variables/material';
import EvalTab from './EvalTab';

interface EvalProps {
  configuration: unknown[];
  defaultData?: object;
  makeAware(...args: unknown[]): unknown;
}

export default class Eval extends React.Component<EvalProps> {
  hasMadeAware = false;

  doNothing = () => {};

  getTab = tabNumber => {
    let tabDict = this.props.configuration[tabNumber];
    let title = Object.keys(tabDict)[0];
    let tab = tabDict[title];
    return [title, tab];
  };

  getTabTitle = tabNumber => {
    let title = this.getTab(tabNumber)[0];
    return title;
  };

  getTabBody = tabNumber => {
    let tab = this.getTab(tabNumber)[1];
    return tab;
  };

  onUpdate = (key, value, human) => {
    this.props.makeAware(key, value, human);
    if (!this.hasMadeAware && human) {
      this.hasMadeAware = true;
    }
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    this.onBack();
    return true;
  };

  onBack = () => {
    this.props.onBack();
    return true;
  };
  render() {
    if (this.props.configuration.length === 0) {
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <ActivityIndicator animating={true} />
          </Container>
        </StyleProvider>
      );
    } else {
      return (
        <StyleProvider style={getTheme(material)}>
          <Container>
            <EvalTab
              defaultData={this.props.defaultData}
              tabConfig={this.getTabBody(0)}
              onUpdate={this.onUpdate}
            />
          </Container>
        </StyleProvider>
      );
    }
  }
}
