import React, { useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTransactionStore } from '../store/useTransactionStore';
import { TransactionItem } from '../components/TransactionItem';
import { RootStackParamList, Transaction } from '../types/transaction';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TransactionList'>;

const TransactionListScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { transactions, isLoading, fetchTransactions } = useTransactionStore();

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handlePressItem = useCallback(
        (transaction: Transaction) => {
            navigation.navigate('TransactionDetail', { transaction });
        },
        [navigation]
    );

    const renderItem = useCallback(
        ({ item }: { item: Transaction }) => (
            <TransactionItem transaction={item} onPress={handlePressItem} />
        ),
        [handlePressItem]
    );

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0066cc" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.refId}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text style={styles.emptyText}>No recent transactions found.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    listContent: {
        paddingBottom: 24,
    },
    emptyText: {
        fontSize: 16,
        color: '#666666',
    },
});

export default TransactionListScreen;