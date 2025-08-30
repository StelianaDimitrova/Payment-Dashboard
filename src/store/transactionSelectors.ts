import type { Transaction } from "../interfaces/transaction.interface";
import type { RootState } from "./index";

import { createSelector } from "@reduxjs/toolkit";

const selectItems = (state: RootState) : Transaction[] => state.transaction.items;

export const selectTotalTransaction = createSelector([selectItems], (items) => {
  const total = items.reduce((acc, item) => item.mustPaid + acc, 0);
  return total;
});

export const selectTotalSales = createSelector([selectItems], (items) => {
  const sales = items
    .filter((i) => i.status === "paid")
    .reduce((acc, i) => acc + i.mustPaid, 0);
  return sales;
});

export const selectTotalPayments = createSelector([selectItems], (items) => {
  const payments = items.reduce((acc, i) => acc + i.currentAmount, 0);
  return payments;
});
