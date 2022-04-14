import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0bf5a7',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});

interface MoveToProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  moveToPage: {name: string; title: string};
}

const MoveTo: React.FC<MoveToProps> = ({navigation, moveToPage}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(moveToPage.name)}>
      <Text style={styles.text}>move to {moveToPage.title}</Text>
    </TouchableOpacity>
  );
};

export default MoveTo;
