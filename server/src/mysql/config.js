const mysql = require("mysql");

const pool = mysql.createPool({
  database: "react-admin",
  host: "localhost",
  user: "root",
  password: "root",
  connectionLimit: 30,
  connectTimeout: 60 * 1000
});

const query = (sql, holder) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        throw err;
        reject(err);
      } else {
        connection.query(sql, holder, (err, result) => {
          if (err) {
            throw err;
            reject(err);
          } else {
            resolve(result);
          }
          connection.release();
        });
      }
    });
  });

module.exports = {
  pool,
  query
};
