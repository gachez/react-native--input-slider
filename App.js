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
        <View style={styles.mark1} />
        <View style={styles.mark2} />
        <View style={styles.mark3} />
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
    height: 2,
    width: vw(91),
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#000',
    justifyContent: 'center',
  },
  mark1: {
    position: 'absolute',
    height: 9,
    borderWidth: 2,
    alignSelf: 'flex-start',
    zIndex: 1,
  },
  mark2: {
    position: 'absolute',
    height: 9,
    borderWidth: 2,
    alignSelf: 'center',
    zIndex: 0,
  },
  mark3: {
    position: 'absolute',
    height: 9,
    borderWidth: 2,
    alignSelf: 'flex-end',
    zIndex: 1,
  },
});
export default App;
