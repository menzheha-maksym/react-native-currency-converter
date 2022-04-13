import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

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
  },
});

const Converter: React.FC<{}> = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Converter</Text>
      </View>
      <TextInput style={styles.input} placeholder='"15 usd" in "uah"' />
      <View style={styles.button}>
        <Button title="Convert" />
      </View>
    </View>
  );
};

export default Converter;
