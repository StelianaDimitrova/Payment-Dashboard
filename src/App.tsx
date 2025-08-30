import { useSelector } from "react-redux";
import "./App.css";
import Invoices from "./components/Invoices";

import TotalCard from "./components/TotalCard";
import type { RootState } from "./store/index";
import {
  selectTotalPayments,
  selectTotalSales,
  selectTotalTransaction,
} from "./store/transactionSelectors";
import { TransactionLineChart } from "./components/TransactionLineChart";
import { TransactionPieChart } from "./components/TransactionPieChart";

function App() {
  const total = useSelector((state: RootState) =>
    selectTotalTransaction(state)
  );
  const sales = useSelector((state: RootState) => selectTotalSales(state));
  const payments = useSelector((state: RootState) =>
    selectTotalPayments(state)
  );

  return (
    <>
      <h1 className="main-title">Payment Dashboard</h1>
      <div className="dashboard">
        
        <section className="data-container">
          <div className="kpi-container">
            <TotalCard title="Total Transaction" sum={total} />
            <TotalCard title="Total Sales" sum={sales} />
            <TotalCard title="Total Payment" sum={payments} />
          </div>
          <Invoices />
        </section>

        <section className="charts-container">
          <TransactionLineChart />
          <TransactionPieChart />
        </section>
      </div>
      
    </>
  );
}

export default App;
