const express = require("express");
const { handleGetAllTodos, handleTodoById, handleAddNewTodo, handleUpdateTodo, handleDeleteTodo } = require("../controllers/handlers");


const apiRouter = express.Router();


// get all todos
apiRouter.get("/", handleGetAllTodos );

// get one todo by id
apiRouter.get("/:id", handleTodoById );

// adding a todo to the database
apiRouter.post("/", handleAddNewTodo );

// delete one todo
apiRouter.delete("/:id", handleDeleteTodo );

// update one todo
apiRouter.put("/:id", handleUpdateTodo );

module.exports = apiRouter;

