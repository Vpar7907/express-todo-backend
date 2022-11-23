/**
 * @module controller/todo
 */
const TodoService = require("../services/todo-service");

/**
 * TodoController
 * @type {object}
 * @constructor
 * @namespace TodoController
 */
class TodoController {
  /**
   * Todo controller serving new todo, take in body of request title and text.
   * @name addTodo
   * @memberof module:controller/todo
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise<{title: string, text: string, isComplete: boolean, userID: string}>} return new todo
   */
  async addTodo(req, res, next) {
    try {
      const { title, text } = req.body;
      const userID = req.user.id;
      const todo = await TodoService.addTodo(title, text, userID);
      return res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Todo controller that delete todo.
   * @name deleteTodo
   * @memberof module:controller/todo
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise<"">} return empty response
   */
  async deleteTodo(req, res, next) {
    try {
      const todoID = req.params.id;
      const userID = req.user.id;
      await TodoService.deleteTodo(todoID, userID);
      res.status(204);
      return res.json({});
    } catch (error) {
      next(error);
    }
  }

  /**
   * Todo controller serving all todos.
   * @name getAllTodo
   * @memberof module:controller/todo
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise<{todo: Array({title: string, text: string, isComplete: boolean, userID: string}), totalPage: number, currentPage: number}>} return edited.
   */
  async getAllTodo(req, res, next) {
    try {
      const { page = 1, limit = 0, ...filter } = req.query;
      const userID = req.user.id;
      const todo = await TodoService.getAllTodo(userID, page, limit, filter);
      return res.json({
        todo: todo.todo,
        totalPage: Math.ceil(todo.count / limit),
        currentPage: page,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Todo controller that gets one todo.
   * @name getTodo
   * @memberof module:controller/todo
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise<{title: string, text: string, isComplete: boolean, userID: string}>} return one todo.
   */
  async getTodo(req, res, next) {
    try {
      const userID = req.user.id;
      const todoID = req.params.id;

      const todo = await TodoService.getTodo(todoID, userID);
      return res.json(todo);
    } catch (error) {
      next(error);
    }
  }
  /**
   * Todo controller that edits a todo, take in body of request: text, title, isComplete.
   * @name editTodo
   * @memberof module:controller/todo
   * @function
   * @async
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next next
   * @return {Promise<{title: string, text: string, isComplete: boolean, userID: string}>} return array of todos.
   */
  async editTodo(req, res, next) {
    try {
      const userID = req.user.id;
      const todoID = req.params.id;
      const title = req.body.title;
      const text = req.body.text;
      const isComplete = req.body.isComplete;

      const todo = await TodoService.editTodo(
        todoID,
        userID,
        title,
        text,
        isComplete
      );
      return res.json(todo);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TodoController();
