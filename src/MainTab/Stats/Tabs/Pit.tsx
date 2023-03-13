import {Container} from 'native-base';
import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import ajax from '../../../ajax';
import Eval from './Evaluation/Eval';

interface PitProps {
  team: number;
  onBack(...args: unknown[]): unknown;
  acknowledgeChanges(...args: unknown[]): unknown;
}

export default class Pit extends React.Component<PitProps> {
  componentDidMount() {
    this.refreshTeam();
  }
  state = {
    refreshing: false,
    configuration: null,
    defaultData: null,
  };

  refreshTeam = async () => {
    let d = await ajax.fetchPitData(this.props.team);
    let c = await ajax.fetchPitConfiguration();
    this.setState({defaultData: d, configuration: c});
  };

  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.refreshTeam();
    this.setState({refreshing: false});
  };

  render() {
    if (this.state.defaultData === null || this.state.configuration === null) {
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
          <Eval
            configuration={this.state.configuration}
            defaultData={this.state.defaultData}
            onBack={this.props.onBack}
            teamNumber={this.state.currentTeamNumber}
            makeAware={this.props.acknowledgeChanges}
          />
        </Container>
      );
    }
  }
}
