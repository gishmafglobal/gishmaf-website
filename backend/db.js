// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./gishmaf.db", (err) => {
//   if (err) console.error(err.message);
//   console.log("Connected to SQLite database.");
// });

// // Create table if not exists
// db.run(`
//   CREATE TABLE IF NOT EXISTS posts (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT,
//     content TEXT,
//     section TEXT,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   )
// `);

// module.exports = db;

db.run(`
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page TEXT,
  block TEXT,
  title TEXT,
  content TEXT,
  image TEXT,
  file TEXT,
  order_no INTEGER
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)
`);


