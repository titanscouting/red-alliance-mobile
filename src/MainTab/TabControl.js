import React from 'react';
import Matches from './Scout/Matches';
import Strategies from './Strategies/Strategies';
import Stats from './Stats/Stats';
import Options from './Options/Options';

import {createAppContainer} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {StyleProvider, Button, Footer, FooterTab, Text} from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

const TabControl = createBottomTabNavigator(
  {
    Teams: {screen: Matches},
    Stats: {screen: Stats},
    Strat: {screen: Strategies},
    Options: {screen: Options},
  },
  {
    tabBarPosition: 'bottom',

    defaultNavigationOptions: ({navigation}) => ({
      tabBarComponent: () => {
        const {routeName} = navigation.state;
        return (
          <StyleProvider style={getTheme(material)}>
            <Footer>
              <FooterTab>
                <Button
                  vertical
                  active={routeName === 'Teams'}
                  onPress={() => navigation.navigate('Teams')}>
                  <Text>Matches</Text>
                </Button>

                <Button
                  vertical
                  active={routeName === 'Stats'}
                  onPress={() => navigation.navigate('Stats')}>
                  <Text>Statistics</Text>
                </Button>

                <Button
                  vertical
                  active={routeName === 'Strat'}
                  onPress={() => navigation.navigate('Strat')}>
                  <Text>Strategies</Text>
                </Button>
                <Button
                  vertical
                  active={routeName === 'Options'}
                  onPress={() => navigation.navigate('Options')}>
                  <Text>Options</Text>
                </Button>
              </FooterTab>
            </Footer>
          </StyleProvider>
        );
      },
    }),
  },
);

export default createAppContainer(TabControl);
