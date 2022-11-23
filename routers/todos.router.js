/**
 * @module routes/todos
 * @requires express
 */
const express = require("express");
const TodoController = require("../controllers/todo-controller");
const authMiddleware = require("../middlewares/auth-middleware");

/**
 * Express router to mount todos related functions on.
 * @type {object}
 * @const
 * @namespace todosRouter
 */
const router = new express.Router();

/**
 * Route that adds a todo.
 * @name POST:/todos/
 * @function
 * @memberof module:routes/todos~todosRouter
 * @param {string} path - http//:API_URL/api/todos/
 * @param {callback} middleware - auth middleware
 * @param {callback} controller - todosController.addTodo
 */
router.post("/todos/", authMiddleware, TodoController.addTodo);

/**
 * Route that deletes a todo.
 * @name DELETE:/todos/:id
 * @function
 * @memberof module:routes/todos~todosRouter
 * @param {string} path - http//:API_URL/api/todos/:id
 * @param {callback} middleware - auth middleware
 * @param {callback} controller - todosController.deleteTodo
 */
router.delete("/todos/:id", authMiddleware, TodoController.deleteTodo);

/**
 * Route that edits a todo.
 * @name PUT:/todos/:id
 * @function
 * @memberof module:routes/todos~todosRouter
 * @param {string} path - http//:API_URL/api/todos/:id
 * @param {callback} middleware - auth middleware
 * @param {callback} controller - todosController.editTodo
 */
router.put("/todos/:id", authMiddleware, TodoController.editTodo);

/**
 * Route that gets a todos.
 * @name GET:/todos
 * @function
 * @memberof module:routes/todos~todosRouter
 * @param {string} path - http//:API_URL/api/todos/
 * @param {callback} middleware - auth middleware
 * @param {callback} controller - todosController.getAllTodos
 */
router.get("/todos", authMiddleware, TodoController.getAllTodo);

/**
 * Route that gets a todo by id.
 * @name GET:/todos/:id
 * @function
 * @memberof module:routes/todos~todosRouter
 * @param {string} path - http//:API_URL/api/todos/:id
 * @param {callback} middleware - auth middleware
 * @param {callback} controller - todosController.getTodo
 */
router.get("/todos/:id", authMiddleware, TodoController.getTodo);

module.exports = router;
