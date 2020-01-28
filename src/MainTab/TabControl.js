import React, { Component } from "react";
import Matchups from "./Matchups/Matchups"
import Pit from "./Pit/Pit"
import Scout from "./Scout/Scout"
import Strategies from "./Strategies/Strategies"
import Stats from "./Stats/Stats"


import { createAppContainer } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleProvider, Button, Text, Icon, Footer, FooterTab,Content} from "native-base";
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import Globals from '../Globals'
import Container from "../../native-base-theme/components/Container";

const TabControl = createBottomTabNavigator(
  {
    Teams: { screen: Scout },
    Pit: { screen: Pit},
    Stats: { screen: Stats},
    Heats: { screen: Matchups},
    Strat: { screen: Strategies}
  }, {
    tabBarPosition: "bottom",


    defaultNavigationOptions: ({ navigation }) => ({
        tabBarComponent: () => {
            const { routeName } = navigation.state;
            return (
                <StyleProvider style={getTheme(material)}>
                    <Footer>
                        <FooterTab>
                            <Button vertical active={routeName === 'Teams'} onPress={() => navigation.navigate("Teams")}>
                                <Icon name="clipboard" />
                                <Text style={{fontSize: 10}}>Scout</Text>
                            </Button>
                            
                            <Button vertical active={routeName === 'Pit'} onPress={() => navigation.navigate("Pit")}>
                                <Icon name="hammer" />
                                <Text style={{fontSize: 10}}>Pit</Text>
                            </Button>
                            
                            <Button vertical active={routeName === 'Stats'} onPress={() => navigation.navigate("Stats")}>
                                <Icon name="pie" />
                                <Text style={{fontSize: 10}}>Stats</Text>
                            </Button>
                            
                            <Button vertical active={routeName === 'Heats'} onPress={() => navigation.navigate("Heats")}>
                                <Icon name="podium" />
                                <Text style={{fontSize: 10}}>Heats</Text> 
                            </Button>
                            
                            <Button vertical active={routeName === 'Strat'} onPress={() => navigation.navigate("Strat")}>
                                <Icon name="git-pull-request" />
                                <Text style={{fontSize: 10}}>Strat</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </StyleProvider>
              );
        }
    }),

  }
);

export default createAppContainer(TabControl);