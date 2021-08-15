/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {vh, vw} from 'react-native-css-vh-vw';
import {StyleSheet, Text, View} from 'react-native';
import {Movable} from './Movable';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Movable maxOffset={vw(91)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: vh(100),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    height: vh(1.5),
    width: vw(91),
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#000',
    justifyContent: 'center',
  },
});
export default App;
