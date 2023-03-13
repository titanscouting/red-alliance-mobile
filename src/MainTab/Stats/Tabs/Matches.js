import {CardItem, Container, Text} from 'native-base';
import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  FlatList,
} from 'react-native';
import ajax from '../../../ajax';

interface MatchesProps {
  team: number;
  style?: object;
}

export default class Matches extends React.Component<MatchesProps> {
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
        paddingRight: 10,
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
      },
      header: {fontWeight: 'bold'},
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
              <CardItem header bordered>
                <Text style={styles.header}>{section.name}</Text>
              </CardItem>
            )}
            renderItem={({item}) => (
              <CardItem style={styles.container} bordered>
                <Text style={styles.match}>{'Match ' + item.match}</Text>
                <Text style={styles.value}>{item.val}</Text>
              </CardItem>
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
