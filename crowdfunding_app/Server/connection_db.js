// crowdfunding_db.js
const mysql = require('mysql2');

// Create a database connection pool
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'crowdfunding.db',
  password: '123456',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Derived connection pool
module.exports = pool;

