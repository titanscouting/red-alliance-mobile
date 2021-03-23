import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  Right,
  StyleProvider,
  Text,
  Textarea,
  Title,
  View,
} from 'native-base';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {BackHandler, FlatList, RefreshControl, ScrollView} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import ajax from '../../ajax';
import MatchStrategyHeader from './MatchStrategyHeader';
import SubmittedStrategyCell from './SubmittedStrategyCell';

export default class MatchStrategyTableView extends Component {
  static propTypes = {
    match: PropTypes.number.isRequired,
    teams: PropTypes.array.isRequired,
    onBack: PropTypes.func.isRequired,
    nicknames: PropTypes.object,
    style: PropTypes.object.isRequired,
  };

  state = {
    strats: null,
    refreshing: true,
    ideas: null,
    submittedStrat: null,
  };

  componentDidMount() {
    this.getSubmittedStrategy();
    this.refreshStrats();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  getSubmittedStrategy = async () => {
    let submittedStrat = await ajax.getUserStrategy(this.props.match);
    if (submittedStrat.data.length > 0) {
      this.setState({
        submittedStrat: submittedStrat.data[0].data,
        ideas: submittedStrat.data[0].data,
      });
    }
  };

  refreshStrats = async () => {
    const strats = await ajax.getStrategiesForMatch(this.props.match);
    this.setState({strats: strats, refreshing: false});
  };

  onSave = async () => {
    await ajax.submitStrategy(this.props.match, this.state.ideas);
    this.props.onBack();
  };
  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    this.props.onBack();
    return true;
  };
  theList = () => {
    const styles = this.props.style.tableViewStyle;
    return (
      <FlatList
        data={this.state.strats}
        renderItem={({item}) => (
          <SubmittedStrategyCell
            scouter={item.scouter}
            strategy={item.data}
            style={styles}
          />
        )}
        keyExtractor={(item, index) => String(index)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refreshStrats}
          />
        }
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  renderStrategyList = () => {
    const styles = this.props.style.tableViewStyle;
    if (this.state.strats == null) {
      return this.theList();
    } else if (this.state.strats.length === 0) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshStrats}
              style={styles.noStrats}
            />
          }>
          <View style={styles.noStrats}>
            <Text>No submitted strategies</Text>
          </View>
        </ScrollView>
      );
    }
    return this.theList();
  };

  handleText = text => {
    this.state.ideas = text;
  };

  render() {
    const styles = this.props.style.tableViewStyle;
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header>
            <Left
              style={{
                paddingLeft: 10,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Button transparent onPress={this.props.onBack}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{'Match ' + this.props.match}</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.onSave}>
                <Icon name="save" />
              </Button>
            </Right>
          </Header>
          <MatchStrategyHeader
            teams={this.props.teams}
            nicknames={this.props.nicknames}
            style={styles}
          />
          <Textarea
            defaultValue={this.state.submittedStrat}
            style={styles.textarea}
            rowSpan={3}
            bordered
            placeholder={
              'Detail your own match strategy here. How should we work with the teams on our alliance and work against the teams on the opposing alliance?'
            }
            onChangeText={this.handleText}
          />
          {this.renderStrategyList()}
        </Container>
      </StyleProvider>
    );
  }
}
