import React from 'react';
import { Container, Header, Title, Accordion, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchCell';
import ajax from '../../ajax'
import { StackActions } from 'react-navigation';




export default class Matches extends React.Component {

    
    state = {
        matches: [],
        currentMatchID: null,
    };


    async componentDidMount() {
        const matches = await ajax.fetchMatches('2022', 'Central 2019');
        this.setState({ matches })

        const pushAction = StackActions.push({
            routeName: 'Teams',
            params: {
              myUserId: 9,
            },
          });
          
        this.props.navigation.dispatch(pushAction);
    }

    // currentMatch = () => {
    //     return this.state.matches.find((match) => match.key === this.state.currentMatchId);
    // }
    // setCurrentMatch = (matchId) => {
    //     this.setState({
    //         currentMatchId: matchId,
    //     });
    // };
    // render() {
    //     if (this.state.currentMatchId) {
    //         return <MatchDetail match={this.currentMatch()} />;
    //     }
    //     if (this.state.matches.length > 0) {
    //         return <MatchList matches = {this.state.matches} onItemPress={this.setCurrentMatch}/>
    //     }
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.header}>No Matches Availible</Text>
    //         </View>
    //     );
    // }

    // renderItem = ({ index }) => {
    //     return (
    //         <View style={{ height: 50 }}>
    //         <Text style={{ textAlign: 'center' }}>Match {index}</Text>
    //         </View>
    //     );
    // };

    render () {
        return (
            <Container>
                <Content>
                    <FlatList>
                        data = {this.state.matches}
                        renderItem={({item})} => <MatchCell match={item}/>
                    </FlatList>
                </Content>
            </Container>
        );
    }
    
}


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     header: {
//       fontSize: 40,
//     },
//   });