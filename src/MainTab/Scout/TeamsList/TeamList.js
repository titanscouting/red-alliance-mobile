import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, RefreshControl, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import TeamCell from './TeamCell';

export default class TeamList extends React.Component {

    static propTypes = {
        teams: PropTypes.array.isRequired,
        refreshTeams: PropTypes.func.isRequired,
        onItemPress: PropTypes.func.isRequired,
    }

    state = {
        refreshing: false,
    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.props.refreshTeams();
        this.setState({refreshing: false});
    }

    render () {
        if (this.props.teams.length === 0) {
            
            console.warn(this.props.teams.length);
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Header>
                            <Body>
                                <Title>Teams</Title>
                            </Body>
                        </Header>
                        <ActivityIndicator animating={true}/>
                    </Container>
                </StyleProvider>
            );
        } else {
            console.warn(this.props.teams.length);
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Header>
                            <Left>
                                <Button hasText transparent>
                                    <Text>Back</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Title>Teams</Title>
                            </Body>
                        </Header>
                            <FlatList
                                data = {this.props.teams}
                                renderItem={({item}) => 
                                    <TeamCell number={item.team} isBlue={item.isBlue} scouterDescription={item.scouterDescription} isTraditional={item.isTraditional} onPress={this.props.onItemPress}/>
                                }
                                keyExtractor= {item => String(item.number)}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                                }
                                showsVerticalScrollIndicator={false}
                            />
                    </Container>
                </StyleProvider>
            );
        }
        
    }
    
}
