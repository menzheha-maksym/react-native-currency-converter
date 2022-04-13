import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7c6ff3',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  text: {
    fontSize: 21,
  },
});

const Header: React.FC<{}> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Converter</Text>
    </View>
  );
};

export default Header;
