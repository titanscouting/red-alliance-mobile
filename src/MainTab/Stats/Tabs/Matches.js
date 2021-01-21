import { CardItem, Container, Text } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { BackHandler, ActivityIndicator, RefreshControl, SectionList, View } from 'react-native';
import ajax from '../../../ajax';
import Globals from '../../../GlobalDefinitions';


export default class Matches extends React.Component {
    static propTypes = {
        team: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired
    }

    state = {
        refreshing: false,
        statsData: null,
    }

    refreshTeam = async () => {
        let d = await ajax.fetchMatchDataForTeamInCompetition(Globals.data.competition, this.props.team);
        this.setState({ statsData: d });
    }

    onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.refreshTeam();
        this.setState({ refreshing: false });
    }

    render() {
        this.refreshTeam();
        const styles = {
            generic: {
                backgroundColor: "#ffffff",
                color: "black",
            },
            match: {

            },
            value: {

            },
            container: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 20,
                paddingLeft: 20,
            },
        }
        if (this.state.statsData === null) {
            return (
                <Container>
                    <ActivityIndicator animating={true} />
                </Container>
            );
        } else {
            return (
                <Container>
                    <SectionList style={styles.generic}
                        // TODO: https://www.npmjs.com/package/react-native-expandable-section-list
                        sections={this.state.statsData}
                        renderSectionHeader={({ section }) => <CardItem header><Text>{section.name}</Text></CardItem>}
                        renderItem={({ item }) => <View style={styles.container}>
                            <Text style={styles.match}>{"Match " + item.match}</Text>
                            <Text style={styles.value}>{item.val}</Text>
                        </View>}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                        }
                        keyExtractor={(item, index) => index}
                    />
                </Container>
            );
        }
    }
}

