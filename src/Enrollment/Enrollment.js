import React, {Component} from 'react';
import ThemeProvider from '../MainTab/ThemeProvider';
import ajax from '../ajax';
import {
  Alert,
  TextInput,
  Image,
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC2232',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC2232',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC2232',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text2: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  smalltext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
  },
});
export default class Enrollment extends React.Component {
  constructor() {
    super();
    this.state = {team: '2022'};
  }
  addUser() {
    const team = this.state.team;
    ajax.addUserToTeam(team).then(response => {
      try {
        if (!response.success) {
          ajax.warnCouldNotAdd();
          return;
        } else {
          this.checkIfRegistered();
        }
      } catch {
        ajax.warnCouldNotAdd();
      }
    });
  }
  checkIfRegistered() {
    ajax.getUserInfo().then(userinfo => {
      let team;
      try {
        team = parseInt(userinfo.team); // user team is valid
        this.state.team = '';
        AsyncStorage.setItem('tra-is-enrolled-user', 'true').then(
          this.props.navigation.navigate('Teams'),
        );
      } catch (e) {
        team = undefined;
      }
      this.setState({team: team});
    });
  }
  componentDidMount() {
    try {
      AsyncStorage.getItem('tra-google-auth').then(info => {
        try {
          const obj = JSON.parse(info);
          if (obj.key !== undefined) {
            this.checkIfRegistered();
          } else {
            throw new Error('Not signed in');
          }
        } catch {
          ajax.firstTimeSignIn().then(() => {
            this.checkIfRegistered();
          });
        }
      });
    } catch {
      ajax.couldNotLogin();
    }
  }
  render() {
    const enrollmentStyle = ThemeProvider.enrollmentStyle;
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>The Red Alliance</Text>
          <Text style={styles.smalltext}>
            Scouting Matches for your FRC team{'\n'}
          </Text>
        </View>
        <View style={styles.slide1}>
          <Text style={styles.text2}>Scout qualification matches</Text>
          <Text style={styles.smalltext}>
            Collect data about robot performance
          </Text>
        </View>
        <View style={styles.slide3}>
          <TextInput
            defaultValue="2022"
            style={enrollmentStyle.textInputStyle}
            onChangeText={text => {
              this.setState.bind(this);
              this.setState({team: String(text)});
            }}
            value={String(this.state.team)}
            keyboardType="number-pad"
          />
          <Text style={styles.text2}>Enter your team number</Text>
          <Text style={styles.smalltext}>
            Get the data for your team by entering your team number
          </Text>
          <Button
            onPress={() => {
              this.addUser.bind(this);
              this.addUser();
            }}
            title="Sign Up"
            color="#8F182C"
            style={{marginTop: '30px'}}
            accessibilityLabel="Sign up for The Red Alliance"
          />
        </View>
      </Swiper>
    );
  }
}
