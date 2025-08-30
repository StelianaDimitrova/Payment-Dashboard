import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useAppSelector } from "../store/hooks";

import "./TransactionPieChart.css";
import { selectTotalPayments } from "../store/transactionSelectors";
import { useSelector } from "react-redux";
import type { RootState } from "./../store/index";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function TransactionPieChart() {
  const data = useAppSelector((state) => state.transaction.items);
  const payments = useSelector((state: RootState) =>
    selectTotalPayments(state)
  );

  const payMethods = data.reduce((acc: Record<string, number>, item) => {
    acc[item.method] = (acc[item.method] ?? 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(payMethods).map(([method, count]) => ({
    name: method,
    value: count,
  }));

  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-title">Payment Methods</h2>
      <p className="pie-chart-paragraph">
        Transaction breakdown by payment method
      </p>
      <ResponsiveContainer width="100%" height={230}>
        <PieChart className="pie-chart">
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="70%"
            startAngle={0}
            endAngle={180}
            innerRadius={"60%"}
            outerRadius={"100%"}
            paddingAngle={4}
            cornerRadius={4}
            label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="payment-text"
            >
              ${payments}
            </text>
          </Pie>
          <Legend></Legend>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
