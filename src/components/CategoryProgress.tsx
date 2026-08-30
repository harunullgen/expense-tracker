import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Category } from '../types/transaction';
import { formatMoney } from '../utils/money';

interface Props {
  category: Category;
  amount: number;
  percentage: number;
}

export default function CategoryProgress({
  category,
  amount,
  percentage,
}: Props) {
  const width = `${Math.min(Math.max(percentage, 0), 100)}%` as const;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.values}>
          <Text style={styles.amount}>{formatMoney(amount)}</Text>
          <Text style={styles.percentage}>
            {Math.round(percentage)}%
          </Text>
        </View>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  category: {
    fontSize: 15,
    fontWeight: '700',
    color: '#22222A',
  },
  values: {
    flexDirection: 'row',
    gap: 8,
  },
  amount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4D4D59',
  },
  percentage: {
    fontSize: 13,
    color: '#8A8A95',
    width: 38,
    textAlign: 'right',
  },
  track: {
    height: 9,
    backgroundColor: '#ECEEF3',
    borderRadius: 20,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#5B67F1',
    borderRadius: 20,
  },
});
