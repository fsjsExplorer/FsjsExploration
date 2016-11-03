var config = {}

config.repositoryType = 1 // 0=in-memory, 1=mysql, 2 = mongodb

// mysql requires the following table to be created in the database
// whose details are set below.
//
// CREATE TABLE IF NOT EXISTS `todo` (
//   `todo_id` int(11) NOT NULL AUTO_INCREMENT,
//   `text` varchar(1024) NOT NULL,
//   `completed` tinyint(1) NOT NULL,
//   PRIMARY KEY (`todo_id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
//
// These details are used only if repositoryType is set to 1.  Be sure to set
// [] enclosed values to the values that apply to your mysql server instance.
config.mysqlSettings = {}
config.mysqlSettings.host = '[server]'
config.mysqlSettings.user = '[username]'
config.mysqlSettings.password = '[password]'
config.mysqlSettings.database = '[database]'
config.mysqlSettings.connectionLimit = 100

// These details are used only if repositoryType is set to 2.  Be sure to set
// [] enclosed values to the values that apply to your mongodb server instance.
config.mongodbSettings = {}
config.mongodbSettings.url = 'mongodb://[server]:27017/[database]'

module.exports = config
