/* global describe it */
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

var expect = chai.expect

var Fsjs = require('../namespaces.js').Fsjs
var db = require('../repositories/mongo-db/connection.js')

describe('mongodb TodoRepository', function () {
  function emptyTable () {
    return new Promise(function (resolve, reject) {
      var todoCollection = db.get('todo')
      todoCollection.remove({})
        .then(function () {
          resolve()
        })
    })
  }

  it('starts off empty', function () {
    require('../repositories/mongo-db/todo-repository.js')

    return emptyTable()
    .then(function () {
      var todoRepository = new Fsjs.repositories.TodoRepository()
      return expect(todoRepository.listTodos()).to.eventually.have.length(0)
    })
  })

  it('createTodo creates a todo that is returned by listTodos.', function () {
    var todoRepository = new Fsjs.repositories.TodoRepository()
    var taskText = 'A task'

    return emptyTable()
    .then(function () {
      return todoRepository.createTodo(taskText)
    })
    .then(function (result) {
      return todoRepository.listTodos()
    })
    .then(function (result) {
      expect(result.length).to.equal(1)
      expect(result[0].text).to.equal(taskText)
    })
  })

  it('updateTodo modifies an existing todo.', function () {
    var todoRepository = new Fsjs.repositories.TodoRepository()

    var taskText = 'A task'
    var updateTarget, createdTodoId

    return emptyTable()
      .then(function () {
        return todoRepository.createTodo(taskText)
      })
      .then(function (newTodoId) {
        createdTodoId = newTodoId
        return todoRepository.listTodos()
      })
      .then(function (todosList) {
        updateTarget = todosList.filter(t => t.todoId === createdTodoId)[0]
        updateTarget.text = 'modified task'
        updateTarget.completed = true
        return todoRepository.updateTodo(updateTarget)
      })
      .then(function () {
        return todoRepository.listTodos()
      })
      .then(function (todosList) {
        expect(todosList.filter(t => t.todoId === createdTodoId)[0].text).to.equal('modified task')
      })
  })

  it('deleteTodo removes an existing todo.', function () {
    var todoRepository = new Fsjs.repositories.TodoRepository()
    var removingTodoId

    return emptyTable()
      .then(function () {
        return todoRepository.createTodo('A task')
      })
      .then(function () {
        return todoRepository.createTodo('A delete target task')
      })
      .then(function (newItemId) {
        removingTodoId = newItemId
        return todoRepository.createTodo('A n other task')
      })
      .then(function () {
        return todoRepository.listTodos()
      })
      .then(function (todosList) {
        expect(todosList).to.have.length(3)
        return todoRepository.deleteTodo(removingTodoId)
      })
      .then(function () {
        return todoRepository.listTodos()
      })
      .then(function (todosList) {
        expect(todosList).to.have.length(2)
      })
  })

  it('hasCompletedTodos returns false if there are none.', function () {
    var todoRepository = new Fsjs.repositories.TodoRepository()

    return emptyTable()
      .then(function () {
        return Promise.all([
          todoRepository.createTodo('A task'),
          todoRepository.createTodo('A delete target task'),
          todoRepository.createTodo('A n other task')
        ])
      })
      .then(function () {
        return todoRepository.hasCompletedTodos()
      })
      .then(function (completedTodos) {
        expect(completedTodos).to.equal(false)
      })
  })

  it('hasCompletedTodos returns true if there are any completed.', function () {
    var todoRepository = new Fsjs.repositories.TodoRepository()

    return emptyTable()
      .then(function () {
        return Promise.all([
          todoRepository.createTodo('A task'),
          todoRepository.createTodo('A delete target task'),
          todoRepository.createTodo('A n other task')
        ])
      })
      .then(function (ids) {
        return todoRepository.updateTodo(
          {
            'todoId': ids[1],
            'text': 'modified task',
            'completed': true
          }
        )
      })
      .then(function () {
        return todoRepository.hasCompletedTodos()
      })
      .then(function (completedTodos) {
        expect(completedTodos).to.equal(true)
      })
  })

  it('deleteCompletedTodos removes all todos that are completed.', function () {
    var todoRepository = new Fsjs.repositories.TodoRepository()

    return emptyTable()
      .then(function () {
        return Promise.all([
          todoRepository.createTodo('A task'),
          todoRepository.createTodo('A delete target task'),
          todoRepository.createTodo('A n other task')
        ])
      })
      .then(function (ids) {
        return Promise.all([
          function () {
            return todoRepository.updateTodo(
              {
                'todoId': ids[1],
                'text': 'A task',
                'completed': true
              }
            )
          },
          function () {
            return todoRepository.updateTodo(
              {
                'todoId': ids[2],
                'text': 'A delete target task',
                'completed': true
              }
            )
          }
        ])
      })
      .then(function () {
        return todoRepository.deleteCompletedTodos()
      })
      .then(function () {
        return todoRepository.hasCompletedTodos()
      })
      .then(function (completedTodos) {
        expect(completedTodos).to.equal(false)
      })
  })

  it('listTodos can be filtered on completed flag', function () {
    var todoRepository = new Fsjs.repositories.TodoRepository()

    return emptyTable()
      .then(function () {
        return Promise.all([
          todoRepository.createTodo('A task'),
          todoRepository.createTodo('A delete target task'),
          todoRepository.createTodo('A n other task'),
          todoRepository.createTodo('Yet a n other task'),
          todoRepository.createTodo('And yet a n other task')
        ])
      })
      .then(function (ids) {
        return Promise.all([
          (function () {
            return todoRepository.updateTodo(
              {
                'todoId': ids[2],
                'text': 'A delete target task',
                'completed': true
              }
            )
          })(),
          (function () {
            return todoRepository.updateTodo(
              {
                'todoId': ids[3],
                'text': 'A n other task',
                'completed': true
              }
            )
          })()
        ])
      })
      .then(function () {
        return todoRepository.listTodos()
      })
      .then(function (allTodos) {
        expect(allTodos).to.have.length(5)
        return todoRepository.listTodos(true)
      })
      .then(function (completedTodos) {
        expect(completedTodos).to.have.length(2)
        return todoRepository.listTodos(false)
      })
      .then(function (nonCompletedTodos) {
        expect(nonCompletedTodos).to.have.length(3)
      })
  })

  it('setCompletedOnAllTodos sets completed on all todos', function () {
    var todoRepository = new Fsjs.repositories.TodoRepository()

    return Promise.all([
      todoRepository.createTodo('A task'),
      todoRepository.createTodo('A delete target task'),
      todoRepository.createTodo('A n other task'),
      todoRepository.createTodo('Yet a n other task'),
      todoRepository.createTodo('And yet a n other task')
    ])
    .then(function (ids) {
      return todoRepository.setCompletedOnAllTodos(true)
    })
    .then(function () {
      return todoRepository.hasCompletedTodos()
    })
    .then(function (completedTodos) {
      expect(completedTodos).to.equal(true)
    })
    .then(function (ids) {
      return todoRepository.setCompletedOnAllTodos(false)
    })
    .then(function () {
      return todoRepository.hasCompletedTodos()
    })
    .then(function (completedTodos) {
      expect(completedTodos).to.equal(false)
    })
  })
})
