const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define routes for users
router.get("/", userController.findAll);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
