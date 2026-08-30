import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTransactions } from '../context/TransactionContext';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';
import AddTransactionModal from '../components/AddTransactionModal';

export default function HomeScreen() {
  const {
    transactions,
    loading,
    balance,
    income,
    expenses,
  } = useTransactions();

  const [modalVisible, setModalVisible] = useState(false);

  const recentTransactions = useMemo(
    () => transactions.slice(0, 4),
    [transactions]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#5B67F1" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Welcome back 👋</Text>
          <Text style={styles.title}>Expense Tracker</Text>
        </View>

        <SummaryCard
          balance={balance}
          income={income}
          expenses={expenses}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Recent Transactions
          </Text>
          <Text style={styles.count}>
            {transactions.length}
          </Text>
        </View>

        {recentTransactions.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              No transactions yet
            </Text>
            <Text style={styles.emptyText}>
              Add your first income or expense.
            </Text>
          </View>
        ) : (
          recentTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          ))
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>
            + Add Transaction
          </Text>
        </TouchableOpacity>

        <View style={styles.tip}>
          <Text style={styles.tipTitle}>Quick tip</Text>
          <Text style={styles.tipText}>
            Review your spending by category from the
            Statistics tab.
          </Text>
        </View>
      </ScrollView>

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  loading: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  eyebrow: {
    color: '#7C7C87',
    fontSize: 14,
  },
  title: {
    color: '#17171F',
    fontSize: 29,
    fontWeight: '800',
    marginTop: 4,
  },
  sectionHeader: {
    marginTop: 30,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#17171F',
  },
  count: {
    color: '#5B67F1',
    backgroundColor: '#E8E9FF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: '700',
  },
  empty: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#22222A',
  },
  emptyText: {
    color: '#8A8A95',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#5B67F1',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  tip: {
    backgroundColor: '#ECEEFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
  },
  tipTitle: {
    color: '#454EC0',
    fontWeight: '800',
  },
  tipText: {
    color: '#656B9B',
    marginTop: 4,
    lineHeight: 19,
  },
});
