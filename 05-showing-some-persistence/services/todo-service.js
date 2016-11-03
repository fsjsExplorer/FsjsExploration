var Fsjs = require('../namespaces.js').Fsjs
require('../interfaces/i-todo-service.js')

Fsjs.services.TodoService = function (todoRepository) {
  this.createTodo = function (todoText) {
    return todoRepository.createTodo(todoText)
  }

  this.listTodos = function (listCompleted) {
    return todoRepository.listTodos(listCompleted)
  }

  this.updateTodo = function (todoUpdate) {
    return todoRepository.updateTodo(todoUpdate)
  }

  this.deleteTodo = function (todoId) {
    return todoRepository.deleteTodo(todoId)
  }

  this.hasCompletedTodos = function () {
    return todoRepository.hasCompletedTodos()
  }

  this.deleteCompletedTodos = function () {
    return todoRepository.deleteCompletedTodos()
  }

  this.toggleCompletedOnAllTodos = function () {
    return new Promise(function (resolve, reject) {
      todoRepository.hasCompletedTodos()
        .then(function (completedTodos) {
          return todoRepository.setCompletedOnAllTodos(!completedTodos)
        })
        .then(function () {
          resolve()
        })
    })
  }
}
Fsjs.services.TodoService.prototype = Object.create(Fsjs.iServices.iTodoService.prototype)
