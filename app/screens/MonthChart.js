
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const MonthChart = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const categories = {};
      const totalAmounts = {};

      transactions.forEach((transaction) => {
        const category = transaction.category;
        const cost = transaction.cost;
        if (categories[category]) {
          categories[category]++;
          totalAmounts[category] += cost;
        } else {
          categories[category] = 1;
          totalAmounts[category] = cost;
        }
      });

      const totalCount = transactions.length;

      const newChartData = Object.keys(categories).map((category, index) => {
        const percentage = ((categories[category] / totalCount) * 100).toFixed(2);
        return {
          key: category,
          value: categories[category],
          percentage: percentage + '%',
          totalAmount: totalAmounts[category],
          svg: { fill: getRandomColor() },
        };
      });

      setChartData(newChartData);
    }
  }, [transactions]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderLegend = () => {
    return chartData.map((item, index) => (
      <View key={index} style={styles.inputWrapper}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: item.svg.fill,
            marginRight: 5,
          }}
        />
         <Text>{`${item.key} (${item.percentage}) - Total: $${formatNumberWithCommas(item.totalAmount)}`}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {chartData.length > 0 ? (
          <PieChart
            style={{ height: 200, width: 200 }}
            data={chartData}
            innerRadius={'40%'}
            outerRadius={'80%'}
          />
        ) : (
          <Text>No transactions data</Text>
        )}
      </View>

      <View style={styles.legendContainer}>{renderLegend()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    flex: 1,
  },
  legendContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: -100,
    marginBottom:90
  },
  inputWrapper: {
    /*width:'100%',
    borderColor: '#000000',
    backgroundColor: '#FAFAFC',
    borderWidth: 1,
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',*/
    flexDirection:'row',
    paddingVertical:13,
    paddingHorizontal:35,
    borderColor:'#808080',
    borderBottomWidth:1,
    borderTopWidth:1,
    alignItems: 'center',
    backgroundColor: '#FFFFF0',

  },
});

export default MonthChart;
