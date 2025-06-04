// // db.js
// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
// });

// db.connect((err) => {
//   if (err) console.error("DB Error:", err);
//   else console.log("Connected to MySQL");
// });

// module.exports = db;


// backend/db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "mysql-2f2b7876-tomarkiran804-7868.j.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_XUsXEkl5uZ86zisRx_0",
  database: "defaultdb",
  port: "15187",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = pool;
