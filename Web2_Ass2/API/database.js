// The mysql2 module is introduced to connect to the MySQL database
const mysql = require("mysql2");

// The body-parser module is introduced to parse the HTTP request body
const bodyParser = require("body-parser");

// Introduces the http module for creating HTTP servers
const http = require("http");

// Introduction of database connection details configuration
var db = require("./details.js");

// Export module that contains methods for obtaining database connections
module.exports = {
    // The method for get a database connection
    getConnection: () => {
        // Create and return a MySQL database connection
        return mysql.createConnection({
            host: db.host,       
            user: db.user,       
            password: db.password, 
            database: db.database  
        });
    }
};
