import React, { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Category } from '../types/transaction';
import { useTransactions } from '../context/TransactionContext';
import CategoryProgress from '../components/CategoryProgress';
import { formatMoney } from '../utils/money';
import {
  getCurrentMonthLabel,
  isCurrentMonth,
} from '../utils/date';

interface CategoryStat {
  category: Category;
  amount: number;
  percentage: number;
}

export default function StatisticsScreen() {
  const { transactions } = useTransactions();

  const {
    monthlyExpense,
    monthlyIncome,
    stats,
  } = useMemo(() => {
    const monthly = transactions.filter((transaction) =>
      isCurrentMonth(transaction.date)
    );

    const expenses = monthly.filter(
      (transaction) => transaction.type === 'expense'
    );

    const income = monthly
      .filter((transaction) => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0);

    const expenseTotal = expenses.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    const grouped = expenses.reduce<
      Partial<Record<Category, number>>
    >((accumulator, transaction) => {
      accumulator[transaction.category] =
        (accumulator[transaction.category] ?? 0) +
        transaction.amount;

      return accumulator;
    }, {});

    const categoryStats: CategoryStat[] = Object.entries(grouped)
      .map(([category, amount]) => ({
        category: category as Category,
        amount: amount ?? 0,
        percentage:
          expenseTotal > 0
            ? ((amount ?? 0) / expenseTotal) * 100
            : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      monthlyExpense: expenseTotal,
      monthlyIncome: income,
      stats: categoryStats,
    };
  }, [transactions]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>
          Spending overview
        </Text>
        <Text style={styles.title}>Statistics</Text>
        <Text style={styles.month}>
          {getCurrentMonthLabel()}
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>
              Monthly Income
            </Text>
            <Text style={styles.income}>
              {formatMoney(monthlyIncome)}
            </Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>
              Monthly Expense
            </Text>
            <Text style={styles.expense}>
              {formatMoney(monthlyExpense)}
            </Text>
          </View>
        </View>

        <View style={styles.breakdownHeader}>
          <Text style={styles.sectionTitle}>
            Expense Breakdown
          </Text>
          <Text style={styles.sectionSubtitle}>
            By category
          </Text>
        </View>

        <View style={styles.card}>
          {stats.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                No expenses this month
              </Text>
              <Text style={styles.emptyText}>
                Expense categories will appear here.
              </Text>
            </View>
          ) : (
            stats.map((stat) => (
              <CategoryProgress
                key={stat.category}
                category={stat.category}
                amount={stat.amount}
                percentage={stat.percentage}
              />
            ))
          )}
        </View>

        {monthlyExpense > 0 && (
          <View style={styles.insight}>
            <Text style={styles.insightTitle}>
              Top spending category
            </Text>
            <Text style={styles.insightText}>
              {stats[0]?.category} accounts for{' '}
              {Math.round(stats[0]?.percentage ?? 0)}% of
              this month&apos;s expenses.
            </Text>
          </View>
        )}
      </ScrollView>
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
    paddingBottom: 32,
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
  month: {
    color: '#5B67F1',
    fontWeight: '700',
    marginTop: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  summaryLabel: {
    color: '#8A8A95',
    fontSize: 12,
  },
  income: {
    color: '#2ECC71',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 7,
  },
  expense: {
    color: '#E74C3C',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 7,
  },
  breakdownHeader: {
    marginTop: 30,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#17171F',
  },
  sectionSubtitle: {
    color: '#8A8A95',
    marginTop: 3,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#22222A',
  },
  emptyText: {
    color: '#8A8A95',
    marginTop: 5,
  },
  insight: {
    marginTop: 18,
    backgroundColor: '#ECEEFF',
    borderRadius: 16,
    padding: 17,
  },
  insightTitle: {
    color: '#454EC0',
    fontWeight: '800',
  },
  insightText: {
    color: '#656B9B',
    marginTop: 5,
    lineHeight: 19,
  },
});
