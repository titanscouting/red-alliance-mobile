/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import StyleProvider, { Container } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

import TabControl from './MainTab/TabControl';

export default class App extends React.Component {
  render () {
    return (
      // <StyleProvider style={getTheme(material)}>
      //   <Container>
          <TabControl/>
      //  </Container>
      //</StyleProvider>
    );
  }
}

const customTextProps = { 
  style: { 
    fontFamily: "Proxima Nova"
  }
}