import React, {useCallback, useState} from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ExperimentRate from '../components/ExperimentRate';
import {clearStorage} from '../services/storage';

const HomeScreen = () => {
  return (
    <>
      <ExperimentRate />
      <View style={styles.buttonContainer}>
        <Button title="Clear Async Storage" onPress={clearStorage} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
