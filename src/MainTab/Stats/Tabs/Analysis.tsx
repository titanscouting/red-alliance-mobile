import {Container, Toast} from 'native-base';
import React from 'react';
import ajax from '../../../ajax';
import {
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import JSONRenderer from '../../../JSONRenderer';
import {Platform} from 'react-native';

interface AnalysisProps {
  team: number;
  style: object;
}

export default class Analysis extends React.Component<AnalysisProps> {
  state = {
    refreshing: false,
    statsData: null,
  };
  async getAnalysisData() {
    const data = await ajax.fetchTeamTestsData(this.props.team);
    if (!data.success) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'An error occurred getting analysis data!',
          ToastAndroid.LONG,
        );
      } else {
        Toast.show({
          text: 'An error occurred getting analysis data!',
          type: 'warning',
          buttonText: 'OK',
          duration: 2000,
        });
      }
    }
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
    if (this.state.analysisData) {
      return (
        <Container>
          <JSONRenderer data={this.state.analysisData} />
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
