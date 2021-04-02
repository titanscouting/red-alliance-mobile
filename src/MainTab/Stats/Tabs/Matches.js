import {CardItem, Container, Text} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  FlatList,
  View,
} from 'react-native';
import ajax from '../../../ajax';

export default class Matches extends React.Component {
  static propTypes = {
    team: PropTypes.number.isRequired,
    style: PropTypes.object,
  };

  state = {
    refreshing: false,
    statsData: null,
  };

  refreshTeam = async () => {
    let d = await ajax.fetchMatchDataForTeamInCompetition(this.props.team);
    this.setState({statsData: d});
  };
  componentDidMount() {
    this.refreshTeam();
  }
  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.refreshTeam();
    this.setState({refreshing: false});
  };

  render() {
    const styles = {
      generic: {
        backgroundColor: '#ffffff',
        color: 'black',
      },
      match: {},
      value: {
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        paddingRight: 10,
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
      },
    };
    if (this.state.statsData === null) {
      return (
        <Container>
          <FlatList
            refreshControl={<RefreshControl refreshing={true} />}
            showsVerticalScrollIndicator={false}
          />
          <ActivityIndicator animating={true} />
        </Container>
      );
    } else {
      return (
        <Container>
          <SectionList
            style={styles.generic}
            // TODO: https://www.npmjs.com/package/react-native-expandable-section-list
            sections={this.state.statsData}
            renderSectionHeader={({section}) => (
              <CardItem header>
                <Text>{section.name}</Text>
              </CardItem>
            )}
            renderItem={({item}) => (
              <View style={styles.container}>
                <Text style={styles.match}>{'Match ' + item.match}</Text>
                <Text style={styles.value}>{item.val}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            keyExtractor={(item, index) => index}
          />
        </Container>
      );
    }
  }
}
