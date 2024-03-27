const Book = require("../models/bookModel");

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.author || !req.body.isbn) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Book
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    available: req.body.available ? req.body.available : false,
  });

  // Save Book in the database
  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book.",
      });
    else res.send(data);
  });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Data to update can not be empty!" });
    return;
  }

  const id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        res.status(404).send({ message: `Book with id ${id} not found.` });
      } else {
        res.send({ message: "Book updated successfully!", updatedBook });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Book with id ${id}: ${err.message}`,
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.removeById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Book with id ${id} not found.` });
      } else {
        res.status(500).send({
          message: `Could not delete Book with id ${id}: ${err.message}`,
        });
      }
    } else res.send({ message: "Book deleted successfully!" });
  });
};

// Retrieve all Books from the database
exports.findAll = (req, res) => {
  Book.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books.",
      });
    else res.send(data);
  });
};
