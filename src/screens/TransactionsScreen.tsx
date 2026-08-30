import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  TransactionType,
} from '../types/transaction';
import { useTransactions } from '../context/TransactionContext';
import TransactionItem from '../components/TransactionItem';
import FilterChip from '../components/FilterChip';

type Filter = 'all' | TransactionType;

export default function TransactionsScreen() {
  const {
    transactions,
    deleteTransaction,
  } = useTransactions();

  const [filter, setFilter] = useState<Filter>('all');

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') {
      return transactions;
    }

    return transactions.filter(
      (transaction) => transaction.type === filter
    );
  }, [transactions, filter]);

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete transaction?',
      'This transaction will be permanently removed.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text style={styles.eyebrow}>
              Manage your money
            </Text>
            <Text style={styles.title}>Transactions</Text>

            <View style={styles.filters}>
              <FilterChip
                label="All"
                selected={filter === 'all'}
                onPress={() => setFilter('all')}
              />
              <FilterChip
                label="Income"
                selected={filter === 'income'}
                onPress={() => setFilter('income')}
              />
              <FilterChip
                label="Expense"
                selected={filter === 'expense'}
                onPress={() => setFilter('expense')}
              />
            </View>

            <Text style={styles.results}>
              {filteredTransactions.length}{' '}
              {filteredTransactions.length === 1
                ? 'transaction'
                : 'transactions'}
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            showDelete
            onDelete={() => confirmDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              Nothing here
            </Text>
            <Text style={styles.emptyText}>
              No transactions match this filter.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  eyebrow: {
    color: '#7C7C87',
    fontSize: 14,
  },
  title: {
    fontSize: 29,
    fontWeight: '800',
    color: '#17171F',
    marginTop: 4,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 20,
  },
  results: {
    fontSize: 13,
    color: '#8A8A95',
    marginBottom: 12,
  },
  empty: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
  },
  emptyTitle: {
    fontWeight: '800',
    fontSize: 17,
    color: '#22222A',
  },
  emptyText: {
    color: '#8A8A95',
    marginTop: 5,
  },
});
