import React from 'react';
import Matches from './Scout/Matches';
import Strategies from './Strategies/Strategies';
import Stats from './Stats/Stats';
import Settings from './Settings/Settings';

import {createAppContainer} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {StyleProvider, Button, Footer, FooterTab, Text} from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Enrollment from '../Enrollment/Enrollment';
let skipEnroll;
import AsyncStorage from '@react-native-community/async-storage';
AsyncStorage.getItem('tra-is-enrolled-user').then(val => {
  skipEnroll = (val === 'true');
})
const TabControl = createBottomTabNavigator(
  {
    Teams: {screen: Matches},
    Stats: {screen: Stats},
    Strategies: {screen: Strategies},
    Settings: {screen: Settings},
    Enrollment: {
      screen: Enrollment,
      navigationOptions:()=>{
        return {
          tabBarVisible: false, // don't show the navigation bar when enrolling
        };
     }
    }
  },
  {
    tabBarPosition: 'bottom',
    initialRouteName: skipEnroll ? 'Teams' : 'Enrollment', // skip the enrollment screen if the user is already enrolled
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
                  <Icon name="robot" size={24} color="#ffffff" />
                  <Text>Matches</Text>
                </Button>

                <Button
                  vertical
                  active={routeName === 'Stats'}
                  onPress={() => navigation.navigate('Stats')}>
                  <Icon name="chart-pie" size={24} color="#ffffff" />
                  <Text>Statistics</Text>
                </Button>

                <Button
                  vertical
                  active={routeName === 'Strategies'}
                  onPress={() => navigation.navigate('Strategies')}>
                  <Icon name="source-pull" size={24} color="#ffffff" />
                  <Text>Strategies</Text>
                </Button>
                <Button
                  vertical
                  active={routeName === 'Settings'}
                  onPress={() => navigation.navigate('Settings')}>
                  <Icon name="cog" size={24} color="#ffffff" />
                  <Text>Settings</Text>
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
