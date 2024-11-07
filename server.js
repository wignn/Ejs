const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  database: "data",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");

  // Get data
  app.get("/", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
      if (err) throw err;
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "Daftar User" });
    });
  });

  // Insert data
  app.post("/Register", (req, res) => {
    const { Nama, Email, Kundi } = req.body;
    const insertsql =  `INSERT INTO user (Nama, Email, Kundi) VALUES ('${req.body.Nama}', '${req.body.Email}', '${req.body.Kundi}');`
    db.query(insertsql, [Nama, Email, Kundi], (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });

});

app.listen(8000, () => {
  console.log("Server running on port 8000...");
});
