const express = require("express");
const router = express.Router();
const checkToken = require("../middlewares/tokenchecker").checkToken;
const todoController = require("../controllers/todo");

router.get("/version", todoController.getVersion);

router.get("/", checkToken, todoController.getAllTodo);

router.post("/", checkToken, todoController.createTodo);

router.get("/:id", checkToken, todoController.getTodo);

router.put("/", checkToken, todoController.updateTodo);

router.delete("/", checkToken, todoController.deleteTodo);

module.exports = router;
