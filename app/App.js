/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {StyleSheet, Platform, StatusBar} from 'react-native';
import MyStack from './Navigation';

import WelcomeScreen from './screens/WelcomeScreen';



// main entry point of the application
const App = () => {
  return <MyStack />;//Stack navigator componnets
};

export default App;
