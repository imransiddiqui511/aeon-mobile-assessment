import { create } from 'zustand';
import { Transaction } from '../types/transaction';
import { mockTransactions } from '../utils/mockData';

interface TransactionState {
    transactions: Transaction[];
    isLoading: boolean;
    fetchTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
    transactions: [],
    isLoading: false,
    fetchTransactions: async () => {
        set({ isLoading: true });
        setTimeout(() => {
            set({ transactions: mockTransactions, isLoading: false });
        }, 1000);
    },
}));