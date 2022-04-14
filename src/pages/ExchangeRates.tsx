import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import MoveTo from '../components/MoveTo';
import RatesTable from '../components/RatesTable';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7CA1B4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  navButton: {
    width: '100%',
    height: 80,
  },
  picker: {
    backgroundColor: '#02a9fc',
    borderRadius: 0,
  },
});

interface ExchangeRatesProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const ExchangeRates: React.FC<ExchangeRatesProps> = ({navigation}) => {
  const moveToPage = {name: 'Converter', title: 'Converter'};

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('usd');
  const [items, setItems] = useState<ItemType<any>[]>();

  const [ratesData, setRatesData] = useState<{}>();

  useEffect(() => {
    fetch(`http://www.floatrates.com/daily/${value}.json`)
      .then(res => res.json() as Object)
      .then(json => {
        setRatesData(json);
        const iv = [];
        for (let [k, v] of Object.entries(json)) {
          iv.push({label: k, value: String(v.code)});
        }
        setItems(iv);
      });
  }, [value]);

  return (
    <>
      <View>
        {items ? (
          <DropDownPicker
            open={open}
            value={value}
            items={items!}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={v => console.log(v)}
            translation={{PLACEHOLDER: 'Select currency'}}
            style={styles.picker}
          />
        ) : (
          <Text>loading...</Text>
        )}
      </View>
      <View style={styles.container}>
        <Text>Exchange Rates</Text>
        {value && ratesData ? (
          <RatesTable currency={value} ratesData={ratesData} />
        ) : null}
      </View>
      <View style={styles.navButton}>
        <MoveTo navigation={navigation} moveToPage={moveToPage} />
      </View>
    </>
  );
};

export default ExchangeRates;
