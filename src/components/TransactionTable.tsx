import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import "./TransactionTable.css";
import { fetchTransactionData } from "../store/transactionAction";

interface Props {
  searchByValue: string;
  filterByStatus: string;
  filterByDate: string;
}

export default function TransactionTable({
  searchByValue,
  filterByStatus,
  filterByDate,
}: Props) {
  const dispatch = useAppDispatch();
  const allTransactions = useAppSelector((state) => state.transaction.items);

  useEffect(() => {
    dispatch(fetchTransactionData());
  }, [dispatch]);

  const searched = allTransactions.filter((tr) => {
    const matchesSearch =
      tr.user.toLowerCase().includes(searchByValue) ||
      tr.email.toLowerCase().includes(searchByValue);

    const matchesStatus = filterByStatus ? tr.status === filterByStatus : true;

    const matchesDate = (() => {
      if (!filterByDate) return true;

      const date = new Date(tr.date);
      const now = new Date();

      if (filterByDate === "this_month") {
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }

      if (filterByDate === "last_month") {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return (
          date.getMonth() === lastMonth.getMonth() &&
          date.getFullYear() === lastMonth.getFullYear()
        );
      }
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="container">
      {searched.length === 0 ? (
        <p className="no-results">No records found.</p>
      ) : (
        <table>
          <thead>
            <tr id="attributes">
              <th>Date</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Status</th>
              <th>Current Payment</th>
              <th>Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {searched.map((t) => (
              <tr className="tuples" key={t.id}>
                <td>{t.date}</td>
                <td>{t.user}</td>
                <td>{t.email}</td>
                <td className={`status ${t.status}`}>{t.status}</td>
                <td>
                  {t.currentAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>
                  {t.mustPaid.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
