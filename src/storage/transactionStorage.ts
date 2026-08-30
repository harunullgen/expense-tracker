import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../types/transaction';

const TRANSACTIONS_KEY = '@expense_tracker_transactions';
const INITIALIZED_KEY = '@expense_tracker_initialized';

export async function loadTransactions(): Promise<Transaction[] | null> {
  try {
    const initialized = await AsyncStorage.getItem(INITIALIZED_KEY);

    if (!initialized) {
      return null;
    }

    const stored = await AsyncStorage.getItem(TRANSACTIONS_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as Transaction[];
  } catch (error) {
    console.log('Error loading transactions:', error);
    return [];
  }
}

export async function saveTransactions(
  transactions: Transaction[]
): Promise<void> {
  try {
    await AsyncStorage.multiSet([
      [TRANSACTIONS_KEY, JSON.stringify(transactions)],
      [INITIALIZED_KEY, 'true'],
    ]);
  } catch (error) {
    console.log('Error saving transactions:', error);
  }
}
