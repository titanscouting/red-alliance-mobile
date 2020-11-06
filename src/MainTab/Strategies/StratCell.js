import { ListItem } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Globals from '../../GlobalDefinitions';

export default class StratCell extends React.Component {

    static propTypes = {
        match: PropTypes.number.isRequired,
        teams: PropTypes.array.isRequired,
        handlePress: PropTypes.func.isRequired,
        style: PropTypes.object.isRequired
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;ßß
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handlePress = async () => {
        this.props.handlePress(this.props.match, this.props.teams);
        
    };

    render () {
        const styles = this.props.style;
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <ListItem style={styles.cell}>
                <View style={styles.left}>
                    <View backgroundColor={Globals.colors.blue} style={styles.ribbon}/>
                    <View width={5}/>
                    <View style={styles.blue}>
                        <Text style={styles.type}>{"Team "+this.props.teams[0]}</Text>
                        <Text style={styles.type}>{"Team "+this.props.teams[1]}</Text>
                        <Text style={styles.type}>{"Team "+this.props.teams[2]}</Text>
                    </View>
                </View>
                <Text style={styles.match}>{"Match "+this.props.match}</Text>
                <View style={styles.right}>
                    <View backgroundColor={Globals.colors.red} style={styles.ribbon}/>
                    <View width={5}/>
                    <View style={styles.blue}>
                        <Text style={styles.type}>{"Team "+this.props.teams[3]}</Text>
                        <Text style={styles.type}>{"Team "+this.props.teams[4]}</Text>
                        <Text style={styles.type}>{"Team "+this.props.teams[5]}</Text>
                    </View>
                </View>
               </ListItem>
            </TouchableWithoutFeedback>
            
        );
    }
}

