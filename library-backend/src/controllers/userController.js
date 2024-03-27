const User = require("../models/userModel");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

// Retrieve and return all users from the database
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Request body is empty!" });
    return;
  }

  const id = req.params.id;

  User.updateById(id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `User with id ${id} not found.` });
      } else {
        res.status(500).send({
          message: `Error updating User with id ${id}: ${err.message}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `User with id ${id} not found.` });
      } else {
        res.status(500).send({
          message: `Could not delete User with id ${id}: ${err.message}`,
        });
      }
    } else {
      res.send({ message: `User was deleted successfully!` });
    }
  });
};
