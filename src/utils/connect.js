const ENV = require("./env");


const mysql = require("mysql2");

const connection = mysql.createPool({
  database: ENV.MYSQL_DATABASE,
  user: ENV.MYSQL_USER,
  password: ENV.MYSQL_PASSWORD,
  host: ENV.MYSQL_HOST,
  port: ENV.MYSQL_PORT,
});

connection.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败:", err);
    } else {
      console.log("数据库连接成功~");
    }
  });
});

module.exports = connection.promise();