var Fsjs = require('../namespaces.js').Fsjs

Fsjs.factories.ClassFactory = function (config) {
  switch (config.repositoryType) {
    case 1:
      require('../repositories/my-sql/todo-repository.js')
      break
    case 2:
      require('../repositories/mongo-db/todo-repository.js')
      break
    default:
      require('../repositories/in-memory/todo-repository.js')
  }

  require('../services/todo-service.js')

  this.getTodoService = function () {
    return new Fsjs.services.TodoService(new Fsjs.repositories.TodoRepository())
  }

  this.tearDown = function () {
    if (config.repositoryType === 1) {
      require('../repositories/my-sql/connection.js').end()
    }
    if (config.repositoryType === 2) {
      require('../repositories/mongo-db/connection.js').close()
    }
  }
}
