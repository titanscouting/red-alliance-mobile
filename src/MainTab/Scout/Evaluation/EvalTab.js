import {ListItem} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import EvalCell from './EvalCell';

export default class EvalTab extends React.Component {
  static propTypes = {
    tabConfig: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  cellUpdate = (key, value) => {
    this.props.onUpdate(key, value);
  };

  render() {
    if (this.props.tabConfig != null) {
      return (
        <KeyboardAwareFlatList
          data={this.props.tabConfig}
          renderItem={({item}) => (
            <ListItem style={styles.cell}>
              <Text>{item.name}</Text>
              <View style={styles.separator} />
              <EvalCell config={item} cellUpdate={this.cellUpdate} />
            </ListItem>
          )}
          keyExtractor={item => String(item.key)}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={70}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
