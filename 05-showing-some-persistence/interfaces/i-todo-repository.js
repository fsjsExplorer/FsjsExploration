var Fsjs = require('../namespaces.js').Fsjs

Fsjs.iRepositories.iTodoRepository = function () {}
Fsjs.iRepositories.iTodoRepository.prototype.createTodo = function (todoText) { throw new Error('createTodo() not implemented') }
Fsjs.iRepositories.iTodoRepository.prototype.listTodos = function (listCompleted) { throw new Error('listTodos() not implemented') }
Fsjs.iRepositories.iTodoRepository.prototype.updateTodo = function (todoUpdate) { throw new Error('updateTodo() not implemented') }
Fsjs.iRepositories.iTodoRepository.prototype.deleteTodo = function (todoId) { throw new Error('deleteTodo() not implemented') }
Fsjs.iRepositories.iTodoRepository.prototype.hasCompletedTodos = function () { throw new Error('hasCompletedTodos() not implemented') }
Fsjs.iRepositories.iTodoRepository.prototype.deleteCompletedTodos = function () { throw new Error('deleteCompletedTodos() not implemented') }
Fsjs.iRepositories.iTodoRepository.prototype.setCompletedOnAllTodos = function (completed) { throw new Error('setCompletedOnAllTodos() not implemented') }
