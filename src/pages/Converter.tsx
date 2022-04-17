import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import MoveTo from '../components/MoveTo';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  convert,
  fetchRatesAndConvertAsync,
  getConverter,
} from '../redux/reducers/converterSlice';

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
  result: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#ffffff44',
    width: '60%',
    textAlign: 'center',
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
  button: {
    width: '60%',
    marginTop: 20,
  },
  navButton: {
    width: '100%',
    height: 80,
  },
});

interface ConverterProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const Converter: React.FC<ConverterProps> = ({navigation}) => {
  const moveToPage = {name: 'ExchangeRates', title: 'Exchange Rates'};
  const {fromCurrency, result: convertResult} = useAppSelector(getConverter);

  const [inputText, onChangeInputText] = useState<string>();
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);

  const dispatch = useAppDispatch();

  async function tryConvert() {
    if (!inputText) {
      setError('enter a valid string to convert, (ex "15 usd" in "uah")');
      return;
    }

    try {
      dispatch(convert(inputText));
      setIsConverting(true);
    } catch (err: any) {
      setError(err);
    }
  }

  useEffect(() => {
    if (isConverting) {
      dispatch(fetchRatesAndConvertAsync(fromCurrency));

      setError('');
      setIsConverting(false);
    }
  }, [dispatch, fromCurrency, isConverting]);

  useEffect(() => {
    if (convertResult) {
      setResult(convertResult);
    }
  }, [convertResult]);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.result}>{result}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='"15 usd" in "uah"'
          onChangeText={onChangeInputText}
        />
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
        <View style={styles.button}>
          <Button title="Convert" onPress={tryConvert} />
        </View>
      </View>
      <View style={styles.navButton}>
        <MoveTo navigation={navigation} moveToPage={moveToPage} />
      </View>
    </>
  );
};

export default Converter;
