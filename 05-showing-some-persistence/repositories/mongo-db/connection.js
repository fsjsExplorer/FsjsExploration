var config = require('../../config.js')
var db = require('monk')(config.mongodbSettings.url)

module.exports = db
