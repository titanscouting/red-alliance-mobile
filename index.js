/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

if (Platform.OS === 'android') {
    messaging().setBackgroundMessageHandler(() => {});
}

AppRegistry.registerComponent(appName, () => App);
