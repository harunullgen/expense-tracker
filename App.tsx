import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TransactionProvider } from './src/context/TransactionContext';
import HomeScreen from './src/screens/HomeScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TransactionProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#5B67F1',
            tabBarInactiveTintColor: '#8E8E93',
            tabBarStyle: {
              height: 82,
              paddingTop: 8,
              paddingBottom: 22,
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0.08,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
            tabBarIcon: ({ focused }) => {
              const icons: Record<string, string> = {
                Home: '⌂',
                Transactions: '≡',
                Statistics: '▥',
              };

              return (
                <Text
                  style={{
                    fontSize: focused ? 24 : 22,
                    color: focused ? '#5B67F1' : '#8E8E93',
                  }}
                >
                  {icons[route.name]}
                </Text>
              );
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Transactions" component={TransactionsScreen} />
          <Tab.Screen name="Statistics" component={StatisticsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
}
