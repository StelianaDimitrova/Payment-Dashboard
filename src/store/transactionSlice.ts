import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  PaymentData,
  Transaction,
  TransactionState,
} from "../interfaces/transaction.interface";

const initialState: TransactionState = {
  items: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.items = action.payload;
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.items.push(action.payload);
    },
    updatePayment(
      state,
      action: PayloadAction<{ id: string; payment: PaymentData }>
    ) {
      const { payment, id } = action.payload;

      const index: number = state.items.findIndex((item) => item.id === id);
      if (index < 0) return;

      state.items[index].paymentData.push(payment);
      state.items[index].currentAmount += payment.amount;

      if (
        !state.items[index].currentAmount &&
        state.items[index].currentAmount < state.items[index].mustPaid
      ) {
        state.items[index].status = "pending";
      }

      if (state.items[index].currentAmount === state.items[index].mustPaid) {
        state.items[index].status = "paid";
      }
    },
  },
});

export const transactionAction = transactionSlice.actions;

export default transactionSlice;
