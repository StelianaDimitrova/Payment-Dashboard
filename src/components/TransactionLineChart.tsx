import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAppSelector } from "../store/hooks";
import "./TransactionLineChart.css";
import { useState } from "react";

export const TransactionLineChart = () => {
  const [metric, setMetric] = useState<"transaction" | "sales" | "payment">(
    "transaction"
  );
  const items = useAppSelector((state) => state.transaction.items);

  const transactionData = items.map((item) => ({
    date: item.date,
    value: item.currentAmount,
  }));

  const salesData = items
    .filter((item) => item.status === "paid")
    .map((item) => ({
      date: item.date,
      value: item.currentAmount,
    }));

  const paymentData = items
    .map((item) =>
      item.paymentData.map((pd) => ({
        date: pd.date,
        value: pd.amount,
      }))
    )
    .flat()
    .filter((item) => item.date);

  const chartData =
    metric === "transaction"
      ? transactionData
      : metric === "sales"
      ? salesData
      : paymentData;

  return (
    <div className="chart-container">
      <div className="options">
        <h1 className="chart-title">Montly Transaction</h1>
        <select className="btn-option">
          <option>Monthly</option>
        </select>
      </div>
      <div className="sum-options">
        <button
          className={`btn-options-total ${
            metric === "transaction" ? "active" : ""
          }`}
          onClick={() => setMetric("transaction")}
        >
          Total Transaction
        </button>
        <button
          className={`btn-options-total ${metric === "sales" ? "active" : ""}`}
          onClick={() => setMetric("sales")}
        >
          Total Sales
        </button>
        <button
          className={`btn-options-total ${
            metric === "payment" ? "active" : ""
          }`}
          onClick={() => setMetric("payment")}
        >
          Total Payment
        </button>
      </div>

      <ResponsiveContainer width="90%" height={230}>
        <LineChart data={chartData} className="line-chart">
          <Line dataKey="value" stroke="#ff2f00" strokeWidth={2}></Line>
          <XAxis dataKey="date"></XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
