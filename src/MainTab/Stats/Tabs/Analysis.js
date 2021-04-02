import {Container} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import JSONTree from 'react-native-json-tree';
import ajax from '../../../ajax';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';

export default class Analysis extends React.Component {
  static propTypes = {
    team: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  state = {
    refreshing: false,
    statsData: null,
  };
  async getAnalysisData() {
    const data = await ajax.fetchTeamTestsData(this.props.team);
    this.setState({analysisData: this.cleanupData(data.data)});
  }
  componentDidMount() {
    this.getAnalysisData();
  }
  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  removeNull(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ''
      ) {
        delete obj[propName];
      } else if (typeof obj[propName] === 'object') {
        this.removeNull(obj[propName]);
      }
    }
    return obj;
  }
  cleanupData(data) {
    data = this.removeNull(data);
    for (const key in data) {
      let newKey = key.replace(/[-_]/g, ' ');
      let oldVal = data[key];
      if (Number.isFinite(oldVal)) {
        oldVal = parseFloat(oldVal.toFixed(4));
      }
      const keyArr = newKey.split(' ');
      if (keyArr.length === 3) {
        newKey = `${keyArr[0].charAt(0).toUpperCase() + keyArr[0].slice(1)} ${
          keyArr[1]
        } (${keyArr[2]})`;
      } else if (keyArr.length === 2) {
        newKey = `${keyArr[0].charAt(0).toUpperCase() + keyArr[0].slice(1)} ${
          keyArr[1]
        }`;
      } else if (keyArr.length === 1) {
        newKey = `${keyArr[0].charAt(0).toUpperCase() + keyArr[0].slice(1)}`;
      }
      if (keyArr[0] === 'regression') {
        newKey = `${keyArr[1].charAt(0).toUpperCase() + keyArr[1].slice(1)} ${
          keyArr[0]
        }`;
      }
      data[newKey] = oldVal;
      delete data[key];
      if (data[newKey] === null || data[newKey] === undefined) {
        delete data[newKey];
      }
      if (typeof data[newKey] === 'object') {
        data[newKey] = this.cleanupData(data[newKey]);
      } else {
        data[newKey] = oldVal;
      }
    }
    return data;
  }
  render() {
    const styles = {
      generic: {
        backgroundColor: '#ffffff',
        color: 'black',
      },
      notYetImplemented: {paddingLeft: 20, paddingTop: 20},
      match: {},
      value: {},
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
      },
      treeTheme: {
        scheme: 'google',
        author: 'seth wright (http://sethawright.com)',
        base00: '#1d1f21',
        base01: '#282a2e',
        base02: '#373b41',
        base03: '#969896',
        base04: '#b4b7b4',
        base05: '#c5c8c6',
        base06: '#e0e0e0',
        base07: '#ffffff',
        base08: '#CC342B',
        base09: '#F96A38',
        base0A: '#FBA922',
        base0B: '#198844',
        base0C: '#3971ED',
        base0D: '#3971ED',
        base0E: '#A36AC7',
        base0F: '#3971ED',
      },
    };
    if (this.state.analysisData) {
      return (
        <Container>
          <JSONTree
            data={this.state.analysisData}
            hideRoot={true}
            getItemString={() => null}
            theme={styles.treeTheme}
            isLightTheme={false}
          />
        </Container>
      );
    } else {
      return (
        <Container>
          <FlatList
            refreshControl={<RefreshControl refreshing={true} />}
            showsVerticalScrollIndicator={false}
          />
          <ActivityIndicator animating={true} />
        </Container>
      );
    }
  }
}
