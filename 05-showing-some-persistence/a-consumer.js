var Fsjs = require('./namespaces.js').Fsjs
require('./factories/class-factory.js')

var config = require('./config.js')
var factory = new Fsjs.factories.ClassFactory(config)
var svc = factory.getTodoService()

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match
    })
  }
}

var emptyTodoList = function () {
  return new Promise(function (resolve, reject) {
    svc.listTodos()
      .then(function (list) {
        var itemDeletions = []
        list.map(function (i) {
          itemDeletions.push(svc.deleteTodo(i.todoId))
        })
        Promise.all(itemDeletions).then(function () {
          resolve()
        })
      })
  })
}

var listTodos = function () {
  return new Promise(function (resolve, reject) {
    svc.listTodos()
      .then(function (list) {
        if (list.length === 0) {
          console.log('No todo items to list.')
        } else {
          list.map(function (i) {
            console.log('id: {0}, completed: {1}, text: {2}'.format(i.todoId, i.completed, i.text))
          })
        }
        console.log()
        resolve(list)
      })
  })
}

console.log('Emptying existing list.')
emptyTodoList()
  .then(function () {
    return listTodos()
  })
  .then(function () {
    console.log('Creating 3 new todo items.')
    console.log()
    var processes = []
    processes.push(svc.createTodo('Take dog for vaccinations'))
    processes.push(svc.createTodo('Mail party invites'))
    processes.push(svc.createTodo('Synchronize the location photographs'))
    return Promise.all(processes)
  })
  .then(function () {
    return listTodos()
  })
  .then(function (list) {
    console.log('Setting 1 to completed.')
    console.log()
    var targets = list.filter(function (item) {
      return item.text === 'Take dog for vaccinations'
    })
    if (targets.length > 0) {
      var target = JSON.parse(JSON.stringify(targets[0]))
      target.completed = true
      return svc.updateTodo(target)
    }
    return undefined
  })
  .then(function () {
    return listTodos()
  })
  .then(function () {
    console.log('Toggling all completed flags.')
    console.log()
    return svc.toggleCompletedOnAllTodos()
  })
  .then(function () {
    return listTodos()
  })
  .then(function () {
    console.log('Toggling all completed flags again.')
    console.log()
    return svc.toggleCompletedOnAllTodos()
  })
  .then(function () {
    return listTodos()
  })
  .then(function () {
    console.log('Deleting all completed todo items.')
    console.log()
    return svc.deleteCompletedTodos()
  })
  .then(function () {
    return listTodos()
  })
  .then(function () {
    factory.tearDown()
  })
