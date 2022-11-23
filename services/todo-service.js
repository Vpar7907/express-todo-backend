/**
 * @module services/todo
 */
const ApiError = require("../exceptions/api-error");
const TodoModel = require("../models/todo-model");

/**
 * TodoService
 * @type {object}
 * @constructor
 * @namespace TodoService
 */
class TodoService {
  /**
   * Todo services validating user.
   * @name validateUser
   * @memberof module:services/todo
   * @function
   * @async
   * @param {string} userID user.id from req.user
   * @param {object} todo todo object from bd
   * @return {Promise} is user is not access to todo, server throw error
   */
  async validateUser(userID, todo) {
    if (todo.userID.toString() !== userID) {
      throw ApiError.NotAccess();
    }
  }

  /**
   * Todo services serving new todo.
   * @name addTodo
   * @memberof module:services/todo
   * @function
   * @async
   * @param {string} title title from req.body
   * @param {string} text text from req.body
   * @param {string} userID user.id from req.user
   * @return {Promise<{title: string, text: string, isComplete: boolean, userID: string}>} return new todo
   */
  async addTodo(title, text, userID) {
    const todo = await TodoModel.create({ title, text, userID });
    return todo;
  }

  /**
   * Todo services that delete todo.
   * @name deleteTodo
   * @memberof module:services/todo
   * @function
   * @async
   * @param {string} todoID from params
   * @param {string} userID from req.user.id
   * @return {Promise<"">} return empty
   */
  async deleteTodo(todoID, userID) {
    const todo = await TodoModel.findById(todoID);
    if (!todo) {
      throw ApiError.NotFound();
    }
    this.validateUser(userID, todo);
    todo.delete();
    await todo.save();
    return;
  }

  /**
   * Todo services serving todos, if not filter and limits return all todos.
   * @name getAllTodo
   * @memberof module:services/todo
   * @function
   * @async
   * @param {string} userID req.user.id
   * @param {number} page? from query
   * @param {number} limit? from query
   * @param {Object} filter? next
   * @return {Promise<{todo: Array({title: string, text: string, isComplete: boolean, userID: string}), count: number}>} return array of todos.
   */
  async getAllTodo(userID, page, limit, filter) {
    const todo = await TodoModel.find({ userID, ...filter })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const allTodo = await TodoModel.find({ userID, ...filter });
    const count = allTodo.length;
    return { todo, count };
  }

  /**
   * Todo services that gets one todo.
   * @name getTodo
   * @memberof module:services/todo
   * @function
   * @async
   * @param {string} todoID from params
   * @param {string} userID from req.user.id
   * @return {Promise<{title: string, text: string, isComplete: boolean, userID: string}>} return one todo.
   */
  async getTodo(todoID, userID) {
    const todo = await TodoModel.findById(todoID);
    console.log(todo);
    this.validateUser(userID, todo);
    return todo;
  }

  /**
   * Todo services that edits a todo.
   * @name editTodo
   * @memberof module:services/todo
   * @function
   * @async
   * @param {string} todoID from params
   * @param {string} userID from req.user.id
   * @param {string} title title from req.body
   * @param {string} text text from req.body
   * @param {boolean} isComplete user.id from req.user
   * @return {Promise<{title: string, text: string, isComplete: boolean, userID: string}>} return adited todos.
   */
  async editTodo(todoID, userID, title, text, isComplete) {
    const todo = await TodoModel.findById(todoID);
    this.validateUser(userID, todo);
    todo.title = title;
    todo.text = text;
    todo.isComplete = isComplete;
    await todo.save();
    return todo;
  }
}

module.exports = new TodoService();
