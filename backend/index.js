const express = require("express");
const cors = require("cors");
const { initDB } = require("./db");
const expenseRoutes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

initDB();
app.use("/expenses", expenseRoutes);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
