import React from 'react';
import { Container, Separator, Header, Title, Accordion, ListItem, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList, StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import Globals from '../../../GlobalDefinitions'
import { TouchableWithoutFeedback } from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import Segment from '../../../../native-base-theme/components/Segment';

export default class EvalCell extends React.Component {

    static propTypes = {
        config: PropTypes.object.isRequired,
        cellUpdate: PropTypes.func.isRequired,
    };

    key = (() => this.props.config.key);
    name = (() => this.props.config.name);
    widget = (() => this.props.config.widget);
    options = (() => this.props.config.options);
 
    state = {
        selectedIndex: 0
    };

    handleIndexChange = (index) => {
        this.setState({
            selectedIndex: index
        });
    };
    
    
    render () {

        switch (this.widget()) {
            case 'segment': 
                return (
                    <View style={styles.container}>
                        <Text>{this.name()}</Text>
                        <SegmentedControlTab 
                            tabsContainerStyle={styles.tabsContainerStyle}
                            tabStyle={styles.tabStyle}
                            firstTabStyle={styles.firstTabStyle}
                            lastTabStyle={styles.lastTabStyle}
                            tabTextStyle={styles.tabTextStyle}
                            activeTabStyle={styles.activeTabStyle}
                            activeTabTextStyle={styles.activeTabTextStyle}
                            values={this.options()}
                            selectedIndex={this.state.selectedIndex} 
                            onTabPress={this.handleIndexChange}
                        />
                    </View>
                );

                
            default:
                // TODO: Switch this to error.
                console.log("Widget not found: " + this.widget());
                return (
                    <Text>{"Nothing for widget named: " + this.widget()}</Text>
                )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',
        justifyContent: 'space-around',
      },
      tabViewText: {
        color: '#444444',
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 18,
      },
      titleText: {
        color: '#444444',
        padding: 20,
        fontSize: 14,
        fontWeight: '500',
      },
      headerText: {
        padding: 8,
        fontSize: 14,
        color: '#444444',
      },
      tabContent: {
        color: '#444444',
        fontSize: 18,
        margin: 24,
      },
      Seperator: {
        marginHorizontal: -10,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderTopColor: '#888888',
        marginTop: 24,
      },
      tabStyle: {
        borderColor: Globals.colors[Globals.brand.primary],
      },
      activeTabStyle: {
        backgroundColor: Globals.colors[Globals.brand.primary],
      },
      tabTextStyle: {
        color: '#D52C43',
      },
  });