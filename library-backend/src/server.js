const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

// Use CORS middleware
app.use(cors());

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database.");
});

global.db = db;

// Routes
// require("./routes/bookRoutes")(app);
// require("./routes/userRoutes")(app);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
