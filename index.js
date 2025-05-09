/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './src/screen/login'
import App from './App.tsx'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);