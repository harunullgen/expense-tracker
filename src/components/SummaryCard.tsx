import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { formatMoney } from '../utils/money';

interface Props {
  balance: number;
  income: number;
  expenses: number;
}

export default function SummaryCard({
  balance,
  income,
  expenses,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total Balance</Text>
      <Text style={styles.balance}>{formatMoney(balance)}</Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.smallLabel}>Income</Text>
          <Text style={styles.income}>
            + {formatMoney(income)}
          </Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.smallLabel}>Expenses</Text>
          <Text style={styles.expense}>
            - {formatMoney(expenses)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E2D',
    borderRadius: 22,
    padding: 22,
  },
  label: {
    color: '#B7B7C5',
    fontSize: 14,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  smallLabel: {
    color: '#B7B7C5',
    fontSize: 13,
    marginBottom: 5,
  },
  income: {
    color: '#2ECC71',
    fontSize: 16,
    fontWeight: '700',
  },
  expense: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '700',
  },
  right: {
    alignItems: 'flex-end',
  },
});
