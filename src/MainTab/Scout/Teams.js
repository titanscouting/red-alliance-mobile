
import React from 'react';
import { Container, Header, Title, Accordion, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';

export default class Teams extends React.Component {
    render () {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                        <Icon active name="logo-googleplus" />
                        <Text>Ur Mom</Text>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}