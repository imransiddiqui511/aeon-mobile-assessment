import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Transaction } from '../types/transaction';
import { formatTransaction } from '../utils/formatTransaction';

interface Props {
    transaction: Transaction;
    onPress: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<Props> = ({ transaction, onPress }) => {
    const { isIncoming, formattedAmount, formattedDate } = formatTransaction(transaction);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(transaction)}
            activeOpacity={0.7}
        >
            <View style={styles.leftContainer}>
                <Text style={styles.title}>{transaction.transferName}</Text>
                <Text style={styles.subtitle}>{formattedDate}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={[styles.amount, { color: isIncoming ? '#2e7d32' : '#c62828' }]}>
                    {formattedAmount}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#888888',
    },
    amount: {
        fontSize: 16,
        fontWeight: '700',
    },
});