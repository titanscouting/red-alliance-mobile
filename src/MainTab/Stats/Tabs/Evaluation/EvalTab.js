import { ListItem } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import EvalCell from './EvalCell';

export default class EvalTab extends React.Component {

    static propTypes = {
        tabConfig: PropTypes.array.isRequired,
        onUpdate: PropTypes.func.isRequired,
        defaultData: PropTypes.object,
    }

    cellUpdate = (key, value, human) => {
        this.props.onUpdate(key, value, human);
    }

    componentDidMount() {
        const p = this.props.defaultData;
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                this.cellUpdate(key, p[key], false);
            }
        }
        
    }
     

    render () {
        if (this.props.tabConfig != null) {
            return (
                <KeyboardAwareFlatList
                    data = {this.props.tabConfig}
                    renderItem={({item}) => 
                        <ListItem style={styles.cell}>
                            <Text>{item.name}</Text>
                            <View style={styles.separator}/>
                            <EvalCell defaultData={this.props.defaultData} config={item} cellUpdate={this.cellUpdate}/>
                        </ListItem>
                    }
                    keyExtractor= {item => String(item.key)}
                    showsVerticalScrollIndicator={false}
                    extraScrollHeight={Platform.OS === "ios" ? 70 : -53}
                />
    
            );
        }
        
    }
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});
