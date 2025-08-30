import TransactionTable from "./TransactionTable";

import RequestPaymentModal from "./RequestPaymentModal";
import "./Invoices.css";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import type { Transaction } from "../interfaces/transaction.interface";
import { generateId } from "../utils/generateID";
import { transactionAction } from "../store/transactionSlice";

export default function Invoices() {
  const [searchValue, setSearchName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function handleSearch(searchInput: string) {
    setSearchName(searchInput);
  }

  function handleRequest() {
    setIsModalOpen(true);
  }

  function handleAddTransaction(user: string, email: string, amount: number) {
    const now = new Date();

    const newTransaction: Transaction = {
      id: generateId(),
      date: now.toISOString().split("T")[0],
      user,
      email,
      currentAmount: 0,
      mustPaid: amount,
      status: "pending",
      method: "bank_transfer",
      paymentData: [],
    };

    dispatch(transactionAction.addTransaction(newTransaction));
  }

  function handleReset() {
    setSearchName("");
    setStatus("");
    setDateFilter("");
  }

  return (
    <>
      <RequestPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
      />
      <section id="invoices">
        <div className="table-header">
          <h2>All invoices</h2>
          <div className="table-buttons">
            <div className="filters">
              <input
                type="text"
                className="search-bar"
                value={searchValue}
                placeholder="Search"
                onChange={(event) => handleSearch(event.target.value)}
              />
              <select
                className="btn-filter"
                name="by_status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Filter By Status</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
              <select
                className="btn-filter"
                name="by_date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Filter By Date</option>
                <option value="this_month">This month</option>
                <option value="last_month">Last month</option>
              </select>
              <button className="btn-reset" onClick={handleReset}>
                Reset Filters
              </button>
            </div>

            <button className="btn-payment" onClick={handleRequest}>
              + Request Payment
            </button>
          </div>
        </div>
        <TransactionTable
          searchByValue={searchValue.toLowerCase()}
          filterByStatus={status}
          filterByDate={dateFilter}
        />
      </section>
    </>
  );
}
