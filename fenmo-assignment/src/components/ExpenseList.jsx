import { deleteExpense } from "../api";

export default function ExpenseList({ expenses, loading, onDeleted }) {
  if (loading) return <p>Loading expenses...</p>;
  if (!expenses.length) return <p>No expenses found.</p>;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  async function handleDelete(id) {
    await deleteExpense(id);
    onDeleted(); // reload list
  }

  return (
    <>
      <h3>Total: ₹{(total / 100).toFixed(2)}</h3>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount (₹)</th>
            <th>Actions</th> {/* NEW */}
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>{(e.amount / 100).toFixed(2)}</td>
              <td>
                <button onClick={() => handleDelete(e.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
