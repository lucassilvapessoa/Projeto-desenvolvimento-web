module.exports = {
    addUser: (user, connection, callback) => {
      const sql = `insert into users (email, password) VALUES ("${user.email}", "${user.password}");`;
      console.log(sql);
      connection.query(sql, callback);
    },
    authUser: (user, connection, callback) => {
      const sql = `select * from users where email='${user.email}' AND password='${user.password}';`;
      console.log(sql);
      connection.query(sql, callback);
    },
  }