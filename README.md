# Expense Tracker – Fenmo Assignment

This is a minimal full-stack Expense Tracker built as part of the Fenmo internship technical assessment.

The application allows users to record and review personal expenses, filter and sort them, and view total spending. It is designed to behave correctly under real-world conditions such as page refreshes and request retries.

---

## Features

### Backend
- Create a new expense (`POST /expenses`)
- List expenses (`GET /expenses`)
- Filter expenses by category
- Sort expenses by date (newest first)
- Idempotent expense creation to handle retries
- Persistent storage using SQLite

### Frontend
- Add expense with amount, category, description, and date
- View expense list in a table
- Automatically sorted by newest date
- Total amount displayed for visible expenses
- Handles loading and error states
- Data persists on page refresh

---

## Tech Stack

**Frontend**
- React
- Vite
- Fetch API

**Backend**
- Node.js
- Express
- SQLite

---

## Design Decisions

- **SQLite** was chosen for persistence because it is lightweight, reliable, and easy to deploy without external dependencies.
- **Amounts are stored in paise (integer)** instead of floating point values to avoid precision issues with money.
- **Idempotent expense creation** ensures correct behavior if the client retries requests due to network issues.
- Frontend intentionally kept simple to prioritize correctness and clarity over styling.

---

## Trade-offs

- Authentication and multi-user support were intentionally not implemented.
- UI styling is minimal to focus on correctness and data handling.
- No pagination due to the small expected dataset.

---

## Running Locally

### Backend
```bash
cd backend
npm install
node index.js

Backend runs at: http://localhost:4000

Frontend
cd fenmo-assignment
npm install
npm run dev
