import axios from "axios";

import type { AppDispatch } from ".";
import type { Transaction } from "../interfaces/transaction.interface";

import { transactionAction } from "./transactionSlice";
import type { AxiosResponse } from "axios";

export const fetchTransactionData = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response: AxiosResponse<{ transactions: Transaction[] }> =
        await axios.get("/transactions.json");
      const data: Transaction[] = response.data.transactions;

      dispatch(transactionAction.setTransactions(data));
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch transactions");
    }
  };
};
