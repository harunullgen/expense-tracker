# Expense Tracker

A clean and modern mobile expense tracking application built with **React Native, Expo, and TypeScript**.

Expense Tracker helps users manage their income and expenses, track their balance, organize transactions by category, and analyze monthly spending through a simple mobile interface.

## Features

- Track income and expenses
- Automatically calculate total balance
- Category-based transactions
- Persistent local storage with AsyncStorage
- All / Income / Expense transaction filters
- Delete transactions with confirmation
- Monthly income and expense statistics
- Category-based expense breakdown
- Responsive reusable React Native components
- Type-safe transaction models with TypeScript
- Three-tab mobile navigation

## Screens

### Home
Shows:
- total balance
- total income
- total expenses
- recent transactions
- add transaction flow

### Transactions
Shows all transactions and supports:
- All filter
- Income filter
- Expense filter
- deleting transactions

### Statistics
Shows:
- current month income
- current month expenses
- category spending percentages
- top spending category

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- React Context API
- AsyncStorage

## Architecture

```text
src/
├── components/
│   ├── AddTransactionModal.tsx
│   ├── CategoryProgress.tsx
│   ├── FilterChip.tsx
│   ├── SummaryCard.tsx
│   └── TransactionItem.tsx
├── constants/
│   └── categories.ts
├── context/
│   └── TransactionContext.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── StatisticsScreen.tsx
│   └── TransactionsScreen.tsx
├── storage/
│   └── transactionStorage.ts
├── types/
│   └── transaction.ts
└── utils/
    ├── date.ts
    └── money.ts
```

## Installation

Install the base Expo project first, then run:

```bash
npx expo install @react-native-async-storage/async-storage
npx expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
```

Start the development server:

```bash
npx expo start -c
```

## Type Check

```bash
npx tsc --noEmit
```

## Portfolio Highlights

This project demonstrates:

- component-driven React Native development
- state management with Context API
- typed data models with TypeScript
- local persistence
- derived state and memoization
- filtering and aggregation
- reusable UI components
- multi-screen navigation
- form validation
- mobile-first UI design


## Screenshots

<p align="center">
  <img src="screenshots/home.jpeg" width="220" alt="Home Screen">
  <img src="screenshots/add-transaction.jpeg" width="220" alt="Add Transaction Screen">
  <img src="screenshots/transactions.jpeg" width="220" alt="Transactions Screen">
  <img src="screenshots/statistics.jpeg" width="220" alt="Statistics Screen">
</p>

## Future Improvements

Potential future improvements include:

- editable transactions
- custom transaction dates
- dark mode
- custom categories
- unit tests
- cloud sync and authentication
