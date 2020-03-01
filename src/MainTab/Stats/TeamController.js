import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, ListItem, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';


import { FlatList, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView, View , BackHandler, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

export default class TeamController extends React.Component {

    static propTypes = {
        team: PropTypes.number.isRequired,
        onBack: PropTypes.func.isRequired,
    }

    state = {
        refreshing: false,
    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.props.refreshTeams();
        this.setState({refreshing: false});
    }

    onBack = () => {
        this.props.onBack(); 
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBack);
    }
    
    componentWillUnmount() {
        this.backHandler.remove()
    }
    

    render () {
        return (
            <Container>
                  <Header>

                    <Left style={{ paddingLeft: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Button transparent onPress={this.onBack}>
                                <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Team {this.props.team}</Title>
                    </Body>
                    <Right style={{  justifyContent: 'flex-end', alignItems: 'flex-end' }}/>
                  </Header>
                
            </Container>
        );
        
    }
    
}




const styles = StyleSheet.create({
    ribbon: {
        width: 15,
        height: 40,
    },
    team: {
      color: 'black',
      fontSize: 18,
      flex: 1,
    },
    type: {
      color: 'black',
      fontSize: 16,
      flex: 1,
    },
    scouter: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cell: {
        flexDirection: 'row'
    }
  });
  