var mysql = require('mysql')
var config = require('../../config.js')

var pool = mysql.createPool({
  connectionLimit: config.mysqlSettings.connectionLimit,
  host: config.mysqlSettings.host,
  user: config.mysqlSettings.user,
  password: config.mysqlSettings.password,
  database: config.mysqlSettings.database,
  debug: false
})

module.exports = pool
