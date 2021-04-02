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
    this.setState({analysisData: data.data});
  }
  componentDidMount() {
    this.getAnalysisData();
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
