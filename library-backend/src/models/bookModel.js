const mysql = require("mysql");

const Book = function (book) {
  this.title = book.title;
  this.author = book.author;
  this.isbn = book.isbn;
  this.available = book.available;
};

Book.create = (newBook, result) => {
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

    connection.query("INSERT INTO books SET ?", newBook, (err, res) => {
      connection.end();
      if (err) {
        console.error("Error creating book: ", err);
        result(err, null);
        return;
      }
      console.log("Created book: ", { id: res.insertId, ...newBook });
      result(null, { id: res.insertId, ...newBook });
    });
  });
};

Book.getAll = (result) => {
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

    connection.query("SELECT * FROM books", (err, res) => {
      connection.end();
      if (err) {
        console.error("Error retrieving books: ", err);
        result(err, null);
        return;
      }
      console.log("Retrieved books: ", res);
      result(null, res);
    });
  });
};

Book.findByIdAndUpdate = (id, updatedBook, result) => {
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

    connection.query(
      "UPDATE books SET title = ?, author = ?, isbn = ?, available = ? WHERE id = ?",
      [
        updatedBook.title,
        updatedBook.author,
        updatedBook.isbn,
        updatedBook.available,
        id,
      ],
      (err, res) => {
        connection.end();

        if (err) {
          console.error("Error updating book: ", err);
          result(err, null);
          return;
        }

        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log(`Updated book with ID ${id}`);
        result(null, { id: id, ...updatedBook });
      }
    );
  });
};

Book.removeById = (id, result) => {
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

    connection.query("DELETE FROM books WHERE id = ?", id, (err, res) => {
      connection.end();

      if (err) {
        console.error("Error deleting book: ", err);
        result(err, null);
        return;
      }
      console.log(`Deleted book with ID ${id}`);
      result(null, res);
    });
  });
};

module.exports = Book;
