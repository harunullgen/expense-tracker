import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  NewTransaction,
  Transaction,
} from '../types/transaction';
import {
  loadTransactions,
  saveTransactions,
} from '../storage/transactionStorage';

interface TransactionContextValue {
  transactions: Transaction[];
  loading: boolean;
  income: number;
  expenses: number;
  balance: number;
  addTransaction: (transaction: NewTransaction) => void;
  deleteTransaction: (id: string) => void;
}

const TransactionContext = createContext<
  TransactionContextValue | undefined
>(undefined);

const now = new Date();

const daysAgo = (days: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const DEMO_TRANSACTIONS: Transaction[] = [
  {
    id: 'demo-1',
    title: 'Salary',
    amount: 18500,
    type: 'income',
    category: 'Salary',
    date: daysAgo(3),
  },
  {
    id: 'demo-2',
    title: 'Groceries',
    amount: 850,
    type: 'expense',
    category: 'Food',
    date: daysAgo(2),
  },
  {
    id: 'demo-3',
    title: 'Netflix',
    amount: 230,
    type: 'expense',
    category: 'Entertainment',
    date: daysAgo(1),
  },
];

export function TransactionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [transactions, setTransactions] =
    useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      const stored = await loadTransactions();

      if (stored === null) {
        setTransactions(DEMO_TRANSACTIONS);
      } else {
        setTransactions(stored);
      }

      setHydrated(true);
      setLoading(false);
    };

    hydrate();
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    saveTransactions(transactions);
  }, [transactions, hydrated]);

  const addTransaction = (transaction: NewTransaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };

    setTransactions((current) => [
      newTransaction,
      ...current,
    ]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const income = useMemo(
    () =>
      transactions
        .filter((item) => item.type === 'income')
        .reduce((total, item) => total + item.amount, 0),
    [transactions]
  );

  const expenses = useMemo(
    () =>
      transactions
        .filter((item) => item.type === 'expense')
        .reduce((total, item) => total + item.amount, 0),
    [transactions]
  );

  const balance = income - expenses;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        income,
        expenses,
        balance,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      'useTransactions must be used inside TransactionProvider'
    );
  }

  return context;
}
