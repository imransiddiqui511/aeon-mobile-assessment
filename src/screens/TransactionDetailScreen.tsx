import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, SafeAreaView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/transaction';
import { formatTransactionDetail } from '../utils/formatTransaction';

type TransactionDetailRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>;

const TransactionDetailScreen = () => {
    const route = useRoute<TransactionDetailRouteProp>();
    const { transaction } = route.params;
    const { isIncoming, formattedAmount, formattedDateWithTime } = formatTransactionDetail(transaction);

    const handleShare = async () => {
        try {
            const shareMessage = `Transaction Details:
            Reference ID: ${transaction.refId}
            Date: ${formattedDateWithTime}
            Recipient: ${transaction.recipientName}
            Transfer Type: ${transaction.transferName}
            Amount: ${formattedAmount}`;
            await Share.share({
                message: shareMessage,
                title: 'Share Transaction',
            });
        } catch (error) {
            console.error('Error sharing transaction:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.card}>

                    <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>Total Amount</Text>
                        <Text style={[styles.amountValue, { color: isIncoming ? '#2e7d32' : '#c62828' }]}>
                            {formattedAmount}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Reference ID</Text>
                        <Text style={styles.detailValue}>{transaction.refId}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date</Text>
                        <Text style={styles.detailValue}>{formattedDateWithTime}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Recipient</Text>
                        <Text style={styles.detailValue}>{transaction.recipientName}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Type</Text>
                        <Text style={styles.detailValue}>{transaction.transferName}</Text>
                    </View>

                </View>

                <TouchableOpacity
                    style={styles.shareButton}
                    onPress={handleShare}
                    activeOpacity={0.8}
                >
                    <Text style={styles.shareButtonText}>Share Receipt</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 24,
    },
    amountContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    amountLabel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 8,
    },
    amountValue: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#eeeeee',
        marginVertical: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    detailLabel: {
        fontSize: 15,
        color: '#888888',
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333333',
        maxWidth: '60%',
        textAlign: 'right',
    },
    shareButton: {
        backgroundColor: '#0066cc',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    shareButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default TransactionDetailScreen;