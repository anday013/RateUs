// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import RateContainer from '../contexts/containers/RateContainer';
import ContactUs from './ContactUs';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <RateContainer>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
        </Stack.Navigator>
      </NavigationContainer>
    </RateContainer>
  );
}

export default Navigator;
