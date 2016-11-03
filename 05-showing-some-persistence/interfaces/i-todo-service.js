var Fsjs = require('../namespaces.js').Fsjs

Fsjs.iServices.iTodoService = function (todoRepository) {}
Fsjs.iServices.iTodoService.prototype.createTodo = function (todoText) { throw new Error('createTodo() not implemented') }
Fsjs.iServices.iTodoService.prototype.listTodos = function (listCompleted) { throw new Error('listTodos() not implemented') }
Fsjs.iServices.iTodoService.prototype.updateTodo = function (todoUpdate) { throw new Error('updateTodo() not implemented') }
Fsjs.iServices.iTodoService.prototype.deleteTodo = function (todoId) { throw new Error('deleteTodo() not implemented') }
Fsjs.iServices.iTodoService.prototype.hasCompletedTodos = function () { throw new Error('hasCompletedTodos() not implemented') }
Fsjs.iServices.iTodoService.prototype.deleteCompletedTodos = function () { throw new Error('deleteCompletedTodos() not implemented') }
Fsjs.iServices.iTodoService.prototype.toggleCompletedOnAllTodos = function () { throw new Error('toggleCompletedOnAllTodos() not implemented') }
