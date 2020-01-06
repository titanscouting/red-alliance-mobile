import React, { Component } from 'react';
import { Container, Header, Title, Accordion, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { createStackNavigator } from 'react-navigation-stack'
import { YellowBox } from 'react-native'
import Globals from '../../Globals'
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed. Maybe https://github.com/GeekyAnts/NativeBase/issues/2947 will help.
])

import PropTypes from 'prop-types';
import Matches from './Matches'
import Teams from './Teams'

const Scout = createStackNavigator({
  Matches: Matches,
  Teams: Teams,
},{
  initialRouteName: 'Matches',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Globals.colors["dark-red"],
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerMode: 'screen',
    cardStyle: { backgroundColor: Globals.colors["dark-red"] },
  },
});

export default Scout;