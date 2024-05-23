const mysql = require("mysql");

//connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.view = (req, res) => {
  //connection to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      'SELECT * FROM users where status="active"',
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("THe data from users table is :\n", rows);
      }
    );
  });
};

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);

    let searchQuery = req.body.search;
    connection.query(
      'SELECT * FROM users where status="active" AND (first_name LIKE ? or last_name LIKE ? or email LIKE ?)',
      [
        "%" + searchQuery + "%",
        "%" + searchQuery + "%",
        "%" + searchQuery + "%",
      ],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("THe data from users table is :\n", rows);
      }
    );
  });
};
exports.form = (req, res) => {
  res.render("adduser");
};

// exports.me = (req, res) => {
//   res.render("hello");
// };

exports.create = (req, res) => {
  const { firstname, lastname, email, comments, phone } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);

    let searchQuery = req.body.search;
    connection.query(
      "Insert into users set first_name=?,last_name=?,email=?,phone=?,comments=?",
      [firstname, lastname, email, phone, comments],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("adduser", {
            alert: "Your records has been inserted successfully",
          });
        } else {
          console.log(err);
        }
        console.log("THe data from users table is :\n", rows);
      }
    );
  });
};

exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      "SELECT * FROM users where id=?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("edit", { rows });
        } else {
          console.log(err);
        }
        console.log("THe data from users table is :\n", rows);
      }
    );
  });
};

//update user

exports.update = (req, res) => {
  const { firstname, lastname, email, comments, phone } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      "UPDATE users set first_name = ?, last_name =?,email=?,phone=?,comments=? where id=?",
      [firstname, lastname, email, phone, comments, req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log("Connected as ID " + connection.threadId);

            connection.query(
              "SELECT * FROM users where id=?",
              [req.params.id],
              (err, rows) => {
                connection.release();
                if (!err) {
                  res.render("edit", {
                    rows,
                    alert: "your records have been updated successfully",
                  });
                } else {
                  console.log(err);
                }
                console.log("THe data from users table is :\n", rows);
              }
            );
          });
        } else {
          console.log(err);
        }
        console.log("THe data from users table is :\n", rows);
      }
    );
  });
};

exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      "UPDATE users set status = ?  where id=?",
      ["removed", req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.redirect("/");
        } else {
          console.log(err);
        }
        console.log("THe data from users table is :\n", rows);
      }
    );
  });
};

exports.viewid = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);

    connection.query(
      "SELECT * FROM users where id=?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("view", { rows });
        } else {
          console.log(err);
        }
        console.log("THe data from users table is :\n", rows);
      }
    );
  });
};
