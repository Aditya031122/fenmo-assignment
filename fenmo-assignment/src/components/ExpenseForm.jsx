import { useState } from "react";
import { createExpense } from "../api";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseForm({ onAdded }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createExpense({
        id: uuidv4(),
        amount: Math.round(Number(form.amount) * 100),
        category: form.category,
        description: form.description,
        date: form.date,
      });

      setForm({ amount: "", category: "", description: "", date: "" });
      onAdded();
    } catch {
      setError("Failed to save expense");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <h3>Add Expense</h3>

      <input
        type="number"
        placeholder="Amount"
        required
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        placeholder="Category"
        required
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="date"
        required
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <button disabled={loading}>
        {loading ? "Saving..." : "Add"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
