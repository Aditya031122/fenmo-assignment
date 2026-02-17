const BASE_URL = "https://fenmo-assignment-production.up.railway.app";

export async function fetchExpenses({ category, sort } = {}) {
  let url = `${BASE_URL}/expenses`;
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (sort) params.append("sort", sort);

  if ([...params].length) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
}

export async function createExpense(expense) {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  if (!res.ok) throw new Error("Failed to create expense");
  return res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete expense");
  return res.json();
}
export async function updateExpense(id, expense) {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  if (!res.ok) throw new Error("Failed to update expense");
  return res.json();
}

