import { Transaction } from '../types/transaction';

export interface FormattedTransaction {
    isIncoming: boolean;
    formattedAmount: string;
    formattedDate: string;
}

export interface FormattedTransactionDetail extends FormattedTransaction {
    formattedDateWithTime: string;
}

export const formatTransaction = (transaction: Transaction): FormattedTransaction => {
    const isIncoming = transaction.amount > 0;
    const formattedAmount = `${isIncoming ? '+' : ''}${transaction.amount.toFixed(2)}`;
    const formattedDate = new Date(transaction.transferDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return {
        isIncoming,
        formattedAmount,
        formattedDate,
    };
};

export const formatTransactionDetail = (transaction: Transaction): FormattedTransactionDetail => {
    const baseFormatted = formatTransaction(transaction);
    const formattedDateWithTime = new Date(transaction.transferDate).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return {
        ...baseFormatted,
        formattedDateWithTime,
    };
};