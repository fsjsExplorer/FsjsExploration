var Fsjs = require('../../namespaces.js').Fsjs

require('../../interfaces/i-todo-repository.js')

Fsjs.repositories.TodoRepository = function () {
  var db = require('./connection.js')
  var ObjectId = require('mongodb').ObjectID

  this.createTodo = function (todoText) {
    return new Promise(function (resolve, reject) {
      var collection = db.get('todo')
      collection.insert({'text': todoText, 'completed': false})
        .then(function (docs) {
          resolve('' + docs._id)
        })
    })
  }

  this.listTodos = function (listCompleted) {
    return new Promise(function (resolve, reject) {
      var collection = db.get('todo')
      var criteria = {}
      if (typeof listCompleted !== 'undefined') {
        criteria = {'completed': listCompleted}
      }

      collection.find(criteria, function (e, docs) {
        var res = docs.map(function (element) {
          var item = {
            'todoId': '' + element._id,
            'text': element.text,
            'completed': element.completed
          }
          return item
        })
        resolve(res)
      })
    })
  }

  this.updateTodo = function (todoUpdate) {
    return new Promise(function (resolve, reject) {
      var collection = db.get('todo')
      collection.update(
        new ObjectId(todoUpdate.todoId),
        {$set: {'text': todoUpdate.text, 'completed': todoUpdate.completed}},
        function (err) {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }

  this.deleteTodo = function (todoId) {
    return new Promise(function (resolve, reject) {
      var collection = db.get('todo')
      collection.remove(new ObjectId(todoId))
        .then(function () { resolve() })
    })
  }

  this.hasCompletedTodos = function () {
    return new Promise(function (resolve, reject) {
      var collection = db.get('todo')
      collection.find(
        {'completed': true},
        function (e, docs) {
          resolve(docs.length > 0)
        }
      )
    })
  }

  this.deleteCompletedTodos = function () {
    return new Promise(function (resolve, reject) {
      var todoCollection = db.get('todo')
      todoCollection.remove({'completed': true})
        .then(function () { resolve() })
    })
  }

  this.setCompletedOnAllTodos = function (completed) {
    return new Promise(function (resolve, reject) {
      var todoCollection = db.get('todo')
      todoCollection.update(
        {},
        {$set: {'completed': completed}},
        {multi: true},
        function (err) {
          if (err) return reject(err)
          resolve()
        }
      )
    })
  }
}
Fsjs.repositories.TodoRepository.prototype = Object.create(Fsjs.iRepositories.iTodoRepository.prototype)
