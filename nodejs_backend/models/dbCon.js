const db_config = require("config").get("db_config");

module.exports =  {con : require("mysql").createConnection(db_config)}