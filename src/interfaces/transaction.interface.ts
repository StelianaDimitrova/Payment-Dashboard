export interface PaymentData {
  date: string;
  amount: number;
}

export interface Transaction {
  id: string;
  date: string;
  user: string;
  email: string;
  currentAmount: number;
  mustPaid: number;
  status: TransactionStatus;
  method: TransactionMethod;
  paymentData: PaymentData[];
}

export interface TransactionState {
  items: Transaction[];
}

export type TransactionStatus = "paid" | "partial" | "pending" | "failed";
export type TransactionMethod = "credit_card" | "paypal" | "bank_transfer";
