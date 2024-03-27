const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Define routes for books
router.get("/", bookController.findAll);
router.post("/", bookController.create);
router.put("/:id", bookController.update);
router.delete("/:id", bookController.delete);

module.exports = router;
