import React from 'react';
import { Container, Header, Title, Accordion, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchCell';


export default class Matches extends React.Component {

    static propTypes = {
        matches: PropTypes.array.isRequired,
    };

    render () {
        return (
            <Container>
                <Content>
                    <FlatList>
                        data = {this.props.matches}
                        renderItem={({item})} => <MatchCell match={item}/>
                    </FlatList>
                </Content>
            </Container>
        );
    }
    
}