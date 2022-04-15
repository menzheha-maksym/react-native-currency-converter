import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../redux/hooks';

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

export type Page = {
  name: string;
  title: string;
};

interface MoveToProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  moveToPage: Page;
}

const MoveTo: React.FC<MoveToProps> = ({navigation, moveToPage}) => {
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch(moveToPage.name)}>
      <Text style={styles.text}>move to {moveToPage.title}</Text>
    </TouchableOpacity>
  );
};

export default MoveTo;
