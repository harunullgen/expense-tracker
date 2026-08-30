import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Transaction } from '../types/transaction';
import { formatMoney } from '../utils/money';
import { formatDate } from '../utils/date';

interface Props {
  transaction: Transaction;
  showDelete?: boolean;
  onDelete?: () => void;
}

export default function TransactionItem({
  transaction,
  showDelete = false,
  onDelete,
}: Props) {
  const isIncome = transaction.type === 'income';

  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>
          {isIncome ? '↑' : '↓'}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.meta}>
          {transaction.category} · {formatDate(transaction.date)}
        </Text>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            isIncome ? styles.income : styles.expense,
          ]}
        >
          {isIncome ? '+' : '-'} {formatMoney(transaction.amount)}
        </Text>

        {showDelete && (
          <TouchableOpacity
            onPress={onDelete}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F0F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#5B67F1',
    fontSize: 20,
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#17171F',
  },
  meta: {
    color: '#8A8A95',
    fontSize: 12,
    marginTop: 4,
  },
  right: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
  },
  income: {
    color: '#2ECC71',
  },
  expense: {
    color: '#E74C3C',
  },
  deleteButton: {
    marginTop: 7,
  },
  deleteText: {
    color: '#E74C3C',
    fontSize: 12,
    fontWeight: '600',
  },
});
