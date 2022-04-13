import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

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

interface ConverterProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const Converter: React.FC<ConverterProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='"15 usd" in "uah"' />
      <View style={styles.button}>
        <Button
          title="Convert"
          onPress={() => navigation.navigate('ExchangeRates')}
        />
      </View>
    </View>
  );
};

export default Converter;
