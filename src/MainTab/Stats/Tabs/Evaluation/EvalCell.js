import { Form, Item, Textarea } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import Globals from '../../../../GlobalDefinitions';
import Stepper from './Stepper';

export default class EvalCell extends React.Component {

    static propTypes = {
        config: PropTypes.object.isRequired,
        cellUpdate: PropTypes.func.isRequired,
        defaultData: PropTypes.object,
    };

    key = (() => this.props.config.key);
    name = (() => this.props.config.name);
    widget = (() => this.props.config.widget);
    options = (() => this.props.config.options);
 
    default = () => {

        if (this.props.defaultData == null) {
            return null;
        }

        let d = null
        if (Object(this.props.defaultData).hasOwnProperty(this.key())) {
            d = this.props.defaultData[this.key()];
        } else { return null; }

        switch (this.widget()) {
            case 'segment': 
                if (this.options().includes(d)) {
                    return this.options().indexOf(d);
                } else { return null; }
            case 'stepper':
                return d;

            case 'text-area':
                return d;
            default:
                console.error("Widget not found: " + this.widget());
                return null;
        }

    }

    

    state = {
        selectedIndex: this.default() ? this.default() : 0
    };

    handleIndexChange = (index) => {
        this.setState({
            selectedIndex: index
        });
        this.props.cellUpdate(this.key(), this.options()[index], true);
    };
    
    handleGeneralChange = (num) => {
        this.props.cellUpdate(this.key(), num, true);
    };

    render () {

        switch (this.widget()) {
            case 'segment': 
                return (
                    <SegmentedControlTab 
                        tabStyle={styles.tabStyle}
                        tabTextStyle={styles.tabTextStyle}
                        activeTabStyle={styles.activeTabStyle}
                        values={this.options()}
                        selectedIndex={this.state.selectedIndex} 
                        onTabPress={this.handleIndexChange}
                    />
                );

            case 'stepper':
                return (
                    <Stepper
                        style={styles.container}
                        labelBackgroundColor={Globals.colors[Globals.brand["primary"]]}
                        buttonsBackgroundColor={Globals.colors[Globals.brand["primary-dark"]]}
                        onChange={this.handleGeneralChange}
                        value={this.default() ? this.default() : -1}
                    />
                );

            case 'text-area':
                return (
                    <Form style={styles.textarea}>
                       
                        <Item style={styles.textarea}>
                         <Textarea maxLength={666} defaultValue={this.default() ? this.default() : ""} style={styles.textarea} rowSpan={3} bordered placeholder={this.options()} onChangeText={this.handleGeneralChange} />
                        </Item>
                    </Form>
                );
            default:
                console.error("Widget not found: " + this.widget());
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
      },
      stepper: {
        flex: 1,
      },
      tabStyle: {
        borderColor: Globals.colors[Globals.brand.primary],
      },
      activeTabStyle: {
        backgroundColor: Globals.colors[Globals.brand.primary],
      },
      tabTextStyle: {
        color: Globals.colors[Globals.brand.primary],
      },
      textarea: {
          flex: 1,
          flexDirection: 'row',
          
      }
  });