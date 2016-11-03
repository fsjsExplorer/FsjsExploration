var Fsjs = require('../../namespaces.js').Fsjs
require('../../interfaces/i-todo-repository.js')

Fsjs.repositories.TodoRepository = function () {
  var _todos = []
  var getNextId = function () {
    if (_todos.length === 0) return 1
    return _todos.map(t => t.todoId).reduce((highest, num) => { return num > highest ? num : highest }) + 1
  }

  this.createTodo = function (todoText) {
    return new Promise(function (resolve, reject) {
      var newTodo = {}
      newTodo.text = todoText
      newTodo.completed = false
      newTodo.todoId = getNextId()
      _todos.push(newTodo)
      resolve(newTodo.todoId)
    })
  }

  this.listTodos = function (listCompleted) {
    return new Promise(function (resolve, reject) {
      var resArray
      if (typeof listCompleted === 'undefined') {
        resArray = _todos
      } else {
        resArray = _todos.filter(t => t.completed === listCompleted)
      }
      resolve(resArray.map(t => JSON.parse(JSON.stringify(t))))
    })
  }

  this.updateTodo = function (todoUpdate) {
    return new Promise(function (resolve, reject) {
      var targetTodo = _todos.filter(t => t.todoId === todoUpdate.todoId)[0]
      if (typeof targetTodo === 'undefined') return
      targetTodo.text = todoUpdate.text
      targetTodo.completed = todoUpdate.completed
      resolve()
    })
  }

  this.deleteTodo = function (todoId) {
    return new Promise(function (resolve, reject) {
      var targetTodo = _todos.filter(t => t.todoId === todoId)[0]
      if (typeof targetTodo === 'undefined') return
      _todos.splice(_todos.indexOf(targetTodo), 1)
      resolve()
    })
  }

  this.hasCompletedTodos = function () {
    return new Promise(function (resolve, reject) {
      resolve(_todos.filter(t => t.completed === true).length > 0)
    })
  }

  this.deleteCompletedTodos = function () {
    return new Promise(function (resolve, reject) {
      var completedTodos = _todos.filter(t => t.completed === true)
      for (var i = 0, len = completedTodos.length; i < len; i++) {
        _todos.splice(_todos.indexOf(completedTodos[i]), 1)
      }
      resolve()
    })
  }

  this.setCompletedOnAllTodos = function (completed) {
    return new Promise(function (resolve, reject) {
      _todos = _todos.map(function (v) {
        v.completed = completed
        return v
      })
      resolve()
    })
  }
}
Fsjs.repositories.TodoRepository.prototype = Object.create(Fsjs.iRepositories.iTodoRepository.prototype)
