// const sqlite3 = require("sqlite3").verbose();
// const bcrypt = require("bcryptjs");

// const db = new sqlite3.Database("./database.sqlite");

// const username = "admin";
// const password = "gishmaf_admin123"; // you can change

// bcrypt.hash(password, 10, (err, hash) => {
//   db.run(
//     "INSERT INTO admins (username, password) VALUES (?, ?)",
//     [username, hash],
//     () => {
//       console.log("Admin created");
//       db.close();
//     }
//   );
// });

const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

const db = new sqlite3.Database("./database.sqlite");

bcrypt.hash("gishmaf_admin123", 10, (err, hash) => {
  db.run(
    "INSERT INTO admins (username, password) VALUES (?, ?)",
    ["admin", hash],
    () => {
      console.log("Admin created");
      db.close();
    }
  );
});
