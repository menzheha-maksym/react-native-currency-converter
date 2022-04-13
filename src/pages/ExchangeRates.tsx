import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7CA1B4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    backgroundColor: '#ffffff445',
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#ffffff44',
    width: '60%',
    textAlign: 'center',
  },
  button: {
    width: '60%',
    marginTop: 20,
  },
});

interface ExchangeRatesProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const ExchangeRates: React.FC<ExchangeRatesProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Exchange Rates</Text>
    </View>
  );
};

export default ExchangeRates;
