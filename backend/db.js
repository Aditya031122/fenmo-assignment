const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("expenses.db");

function initDB() {
  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      amount INTEGER,
      category TEXT,
      description TEXT,
      date TEXT,
      created_at TEXT
    )
  `);
}

module.exports = { db, initDB };
