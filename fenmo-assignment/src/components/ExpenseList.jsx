export default function ExpenseList({ expenses, loading }) {
  if (loading) return <p>Loading expenses...</p>;
  if (!expenses.length) return <p>No expenses found.</p>;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

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
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>{(e.amount / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
