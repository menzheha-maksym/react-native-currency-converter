import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import MoveTo from '../components/MoveTo';
import {useAppDispatch} from '../redux/hooks';
import {fetchRatesAsync} from '../redux/reducers/ratesSlice';

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

  const [inputText, onChangeInputText] = useState<string>();
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const dispatch = useAppDispatch();

  async function tryConvert() {
    if (!inputText) {
      setError('enter a valid string to convert, (ex "15 usd" in "uah")');
      return;
    }
    let currencies = inputText.split('"');
    if (currencies.length !== 5) {
      setError('enter a valid string to convert, (ex "15 usd" in "uah")');
      return;
    }
    currencies = currencies?.slice(1, currencies.length - 1);
    const value = Number(currencies[0].split(' ')[0]);
    const fromCurrency = currencies[0].split(' ')[1];
    const toCurrency = currencies[2];
    if (isNaN(value)) {
      setError('enter a valid string to convert, (ex "15 usd" in "uah")');
      return;
    }
    setError('');

    dispatch(fetchRatesAsync(fromCurrency))
      .unwrap()
      .then(rates => {
        const currencyInfo = rates[toCurrency];
        const converted = value * currencyInfo.rate;
        console.log(rates);
        setResult(
          `${value} ${fromCurrency.toUpperCase()} = ${converted.toFixed(2)} ${
            currencyInfo.code
          }`,
        );
      });
  }
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
