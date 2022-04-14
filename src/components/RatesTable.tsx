import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tableBorder: {
    borderWidth: 1,
  },
});

interface RatesTableProps {
  currency: string;
  ratesData: Object;
}

const RatesTable: React.FC<RatesTableProps> = ({currency, ratesData}) => {
  const [tableHead] = useState(['Currency', 'Rate']);
  const [tableData, setTableData] = useState<string[][]>();

  useEffect(() => {
    const rows = [];
    for (let [k, v] of Object.entries(ratesData)) {
      rows.push([`1 ${k}`, ` ${v.rate.toFixed(2)} ${currency}`]);
    }
    setTableData(rows);
  }, [currency, ratesData]);

  return (
    <>
      <View style={styles.container}>
        <Text>Selected currency {currency}</Text>
        <ScrollView>
          <Table borderStyle={styles.tableBorder}>
            <Row data={tableHead} />
            <Rows data={tableData} />
            {/* {tableData.map((rowData, index) => {
              <Row key={index} data={rowData} />;
            })} */}
          </Table>
        </ScrollView>
      </View>
    </>
  );
};

export default RatesTable;
