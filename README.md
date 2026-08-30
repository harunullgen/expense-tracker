# Expense Tracker

A clean, local-first mobile expense tracking application built with **React Native, Expo, and TypeScript**.

The project was created as a portfolio project for Mobile Developer internship and junior applications.

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

Add screenshots before publishing the repository:

```text
screenshots/
├── home.png
├── add-transaction.png
├── transactions.png
└── statistics.png
```

## Future Improvements

Potential future improvements include:

- editable transactions
- custom transaction dates
- dark mode
- custom categories
- unit tests
- cloud sync and authentication
