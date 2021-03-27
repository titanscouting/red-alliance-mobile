import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
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
    textAlign: 'center',
  },
});
export default class Enrollment extends React.Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>You have been signed out</Text>
          <Text style={styles.smalltext}>
            Thank you for using The Red Alliance{'\n'}
          </Text>
          <Button
            onPress={() => {
              this.props.navigation.navigate('Enrollment');
            }}
            title="Sign In Again"
            color="#000000"
            style={{marginTop: '30px'}}
            accessibilityLabel="Sign in to The Red Alliance"
          />
        </View>
      </Swiper>
    );
  }
}
