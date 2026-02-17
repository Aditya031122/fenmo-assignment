const express = require("express");
const { db } = require("./db");

const router = express.Router();

/**
 * POST /expenses
 * Idempotent via client-generated id
 */
router.post("/", (req, res) => {
  const { id, amount, category, description, date } = req.body;

  if (!id || !amount || !category || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.get("SELECT * FROM expenses WHERE id = ?", [id], (err, row) => {
    if (row) {
      // Retry-safe response
      return res.json(row);
    }

    const created_at = new Date().toISOString();

    db.run(
      `
      INSERT INTO expenses (id, amount, category, description, date, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [id, amount, category, description, date, created_at],
      () => {
        res.status(201).json({
          id,
          amount,
          category,
          description,
          date,
          created_at,
        });
      }
    );
  });
});

/**
 * GET /expenses
 */
router.get("/", (req, res) => {
  let query = "SELECT * FROM expenses";
  const params = [];

  if (req.query.category) {
    query += " WHERE category = ?";
    params.push(req.query.category);
  }

  if (req.query.sort === "date_desc") {
    query += " ORDER BY date DESC";
  }

  db.all(query, params, (_, rows) => res.json(rows));
});

module.exports = router;
