import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

import ExperimentRate from '../components/ExperimentRate';
import {clearStorage} from '../services/storage';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};
const HomeScreen = ({navigation}: Props) => {
  return (
    <>
      <ExperimentRate navigation={navigation} />
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
