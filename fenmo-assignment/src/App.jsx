import { useEffect, useState } from "react";
import { fetchExpenses } from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadExpenses() {
    setLoading(true);
    const data = await fetchExpenses({ sort: "date_desc" });
    setExpenses(data);
    setLoading(false);
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdded={loadExpenses} />
      <ExpenseList expenses={expenses} loading={loading} />
    </>
  );
}
