import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Category,
  TransactionType,
} from '../types/transaction';
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from '../constants/categories';
import { useTransactions } from '../context/TransactionContext';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({
  visible,
  onClose,
}: Props) {
  const { addTransaction } = useTransactions();

  const [type, setType] =
    useState<TransactionType>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] =
    useState<Category | null>(null);

  const categories = useMemo(
    () =>
      type === 'income'
        ? INCOME_CATEGORIES
        : EXPENSE_CATEGORIES,
    [type]
  );

  const resetForm = () => {
    setType('expense');
    setTitle('');
    setAmount('');
    setCategory(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTypeChange = (nextType: TransactionType) => {
    setType(nextType);
    setCategory(null);
  };

  const handleSave = () => {
    const numericAmount = Number(amount.replace(',', '.'));

    if (!title.trim()) {
      Alert.alert('Missing title', 'Please enter a title.');
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      Alert.alert(
        'Invalid amount',
        'Please enter an amount greater than zero.'
      );
      return;
    }

    if (!category) {
      Alert.alert(
        'Missing category',
        'Please select a category.'
      );
      return;
    }

    addTransaction({
      title: title.trim(),
      amount: numericAmount,
      type,
      category,
      date: new Date().toISOString(),
    });

    handleClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheet}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Add Transaction</Text>
                <Text style={styles.subtitle}>
                  Add a new income or expense
                </Text>
              </View>

              <TouchableOpacity onPress={handleClose}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'expense' &&
                    styles.expenseSelected,
                ]}
                onPress={() => handleTypeChange('expense')}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'expense' &&
                      styles.typeSelectedText,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'income' &&
                    styles.incomeSelected,
                ]}
                onPress={() => handleTypeChange('income')}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === 'income' &&
                      styles.typeSelectedText,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholder="Example: Coffee"
              placeholderTextColor="#A0A0AA"
            />

            <Text style={styles.label}>Amount</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              style={styles.input}
              placeholder="Example: 150"
              placeholderTextColor="#A0A0AA"
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryWrap}>
              {categories.map((item) => {
                const selected = category === item;

                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.category,
                      selected && styles.categorySelected,
                    ]}
                    onPress={() => setCategory(item)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected &&
                          styles.categorySelectedText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Date</Text>
              <Text style={styles.dateText}>Today</Text>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>
                Save Transaction
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  sheet: {
    maxHeight: '88%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#17171F',
  },
  subtitle: {
    color: '#888894',
    marginTop: 4,
  },
  close: {
    fontSize: 22,
    color: '#777782',
    padding: 4,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 13,
    backgroundColor: '#ECEEF3',
    borderRadius: 13,
  },
  expenseSelected: {
    backgroundColor: '#E74C3C',
  },
  incomeSelected: {
    backgroundColor: '#2ECC71',
  },
  typeText: {
    color: '#60606B',
    fontWeight: '700',
  },
  typeSelectedText: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    color: '#45454F',
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F4F5F8',
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: '#17171F',
    marginBottom: 18,
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
    marginBottom: 20,
  },
  category: {
    backgroundColor: '#ECEEF3',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  categorySelected: {
    backgroundColor: '#5B67F1',
  },
  categoryText: {
    color: '#5E5E69',
    fontWeight: '600',
  },
  categorySelectedText: {
    color: '#FFFFFF',
  },
  dateBox: {
    backgroundColor: '#F4F5F8',
    padding: 14,
    borderRadius: 13,
    marginBottom: 20,
  },
  dateLabel: {
    color: '#8A8A95',
    fontSize: 12,
  },
  dateText: {
    marginTop: 3,
    fontWeight: '700',
    color: '#22222A',
  },
  saveButton: {
    backgroundColor: '#5B67F1',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
