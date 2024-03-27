const mysql = require("mysql");

// User constructor
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.phone = user.phone;
};

// Create a new user
User.create = (newUser, result) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      result(err, null);
      return;
    }
    console.log("Connected to the database.");

    // Insert query to add a new user
    connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
      connection.end(); // Close the connection
      if (err) {
        console.error("Error creating user: ", err);
        result(err, null);
        return;
      }
      console.log("Created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  });
};

// Retrieve all users
User.getAll = (result) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      result(err, null);
      return;
    }
    console.log("Connected to the database.");

    // Query to fetch all users
    connection.query("SELECT * FROM users", (err, res) => {
      connection.end(); // Close the connection
      if (err) {
        console.error("Error retrieving users: ", err);
        result(err, null);
        return;
      }
      console.log("Retrieved users: ", res);
      result(null, res);
    });
  });
};

// Update a user by ID
User.updateById = (id, user, result) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      result(err, null);
      return;
    }
    console.log("Connected to the database.");

    // Update query to modify user data
    connection.query(
      "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
      [user.name, user.email, user.phone, id],
      (err, res) => {
        connection.end(); // Close the connection
        if (err) {
          console.error("Error updating user: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // User not found with the given ID
          result({ message: "User not found" }, null);
          return;
        }
        console.log("Updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  });
};

// Delete a user by ID
User.deleteById = (id, result) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      result(err, null);
      return;
    }
    console.log("Connected to the database.");

    // Delete query to remove a user by ID
    connection.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      connection.end(); // Close the connection
      if (err) {
        console.error("Error deleting user: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // User not found with the given ID
        result({ message: "User not found" }, null);
        return;
      }
      console.log("Deleted user with ID: ", id);
      result(null, res);
    });
  });
};

module.exports = User;
