var Fsjs = require('../../namespaces.js').Fsjs
var mysql = require('mysql')

require('../../interfaces/i-todo-repository.js')

Fsjs.repositories.TodoRepository = function () {
  var pool = require('./connection.js')

  this.createTodo = function (todoText) {
    return new Promise(function (resolve, reject) {
      pool.query(
        mysql.format(
          'insert into todo (text, completed) values (?, 0)',
          [todoText]),
        function (err, result) {
          if (err) reject(err)
          resolve(result.insertId)
        }
      )
    })
  }

  this.listTodos = function (listCompleted) {
    var sql = 'select todo_id as \'todoId\', text, completed from todo'
    if (typeof listCompleted !== 'undefined') {
      sql += ' where completed ' + (listCompleted ? '> 0' : '= 0')
    }
    return new Promise(function (resolve, reject) {
      pool.query(
        sql,
        function (err, rows) {
          if (err) reject(err)
          resolve(rows.map(function (row) {
            row.completed = row.completed !== 0
            return row
          }))
        }
      )
    })
  }

  this.updateTodo = function (todoUpdate) {
    return new Promise(function (resolve, reject) {
      pool.query(
        mysql.format(
          'update todo set text = ?, completed = ? where todo_id = ?',
          [todoUpdate.text, todoUpdate.completed, todoUpdate.todoId]),
          function (err) {
            if (err) reject(err)
            resolve()
          }
      )
    })
  }

  this.deleteTodo = function (todoId) {
    return new Promise(function (resolve, reject) {
      pool.query(
        mysql.format(
          'delete from todo where todo_id = ?',
          [todoId]),
          function (err) {
            if (err) reject(err)
            resolve()
          }
      )
    })
  }

  this.hasCompletedTodos = function () {
    return new Promise(function (resolve, reject) {
      pool.query(
        'select max(completed) as "hasCompleted" from todo',
        function (err, result) {
          if (err) reject(err)
          resolve(result[0].hasCompleted > 0)
        }
      )
    })
  }

  this.deleteCompletedTodos = function () {
    return new Promise(function (resolve, reject) {
      pool.query(
        'delete from todo where completed <> 0',
        function (err, completed) {
          if (err) reject(err)
          resolve()
        }
      )
    })
  }

  this.setCompletedOnAllTodos = function (completed) {
    return new Promise(function (resolve, reject) {
      pool.query(
        mysql.format(
          'update todo set completed = ?',
          [completed]),
          function (err) {
            if (err) reject(err)
            resolve()
          }
      )
    })
  }
}
Fsjs.repositories.TodoRepository.prototype = Object.create(Fsjs.iRepositories.iTodoRepository.prototype)
