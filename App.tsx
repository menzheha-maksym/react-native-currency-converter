/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Converter from './src/pages/Converter';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExchangeRates from './src/pages/ExchangeRates';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Converter"
          component={Converter}
          options={{
            headerStyle: {backgroundColor: '#b70efa'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="ExchangeRates" component={ExchangeRates} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
