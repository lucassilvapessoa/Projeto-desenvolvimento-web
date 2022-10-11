const mysql = require('mysql');

const host = 'localhost';
const database = 'museu';
const user = 'root';
const password = 'lucas1997';

const dbConn = mysql.createConnection({
  host: host,
  user: user,
  password: password, 
  database: database
});

console.log('[dbConnection State]',dbConn.state);

//teste de conexão
dbConn.connect((error) => {
  console.log('[dbConnection Error]',error);
});

module.exports = dbConn;