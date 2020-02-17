import React, { Component } from "react";
import Matchups from "./Matchups/Matchups"
import Pit from "./Pit/Pit"
import Matches from "./Scout/Matches"
import Strategies from "./Strategies/Strategies"
import Stats from "./Stats/Stats"
import Options from "./Options/Options"


import { createAppContainer } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleProvider, Button, Text, Icon, Footer, FooterTab,Content} from "native-base";
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import Container from "../../native-base-theme/components/Container";

const TabControl = createBottomTabNavigator(
  {
    Teams: { screen: Matches },
    Pit: { screen: Pit},
    Stats: { screen: Stats},
    Heats: { screen: Matchups},
    Strat: { screen: Strategies},
    Options: {screen: Options}
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
                            </Button>
                            
                            <Button vertical active={routeName === 'Pit'} onPress={() => navigation.navigate("Pit")}>
                                <Icon name="hammer" />
                            </Button>
                            <Button vertical active={routeName === 'Stats'} onPress={() => navigation.navigate("Stats")}>
                                <Icon name="md-stats" />
                            </Button>
                            
                            <Button vertical active={routeName === 'Heats'} onPress={() => navigation.navigate("Heats")}>
                                <Icon name="eye" />
                            </Button>
                            
                            <Button vertical active={routeName === 'Strat'} onPress={() => navigation.navigate("Strat")}>
                                <Icon name="git-pull-request" />
                            </Button>
                            <Button vertical active={routeName === 'Options'} onPress={() => navigation.navigate("Options")}>
                                <Icon name="ios-cog" />
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