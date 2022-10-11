const mysql = require('mysql');

// const host = 'museu.cltykvzl9ef6.sa-east-1.rds.amazonaws.com';
// const database = 'museu';
// const user = 'admin';
// const password = 'NFrsw3lF0zSxK3WMSl8k';

const host = 'localhost';
const database = 'pontoturistico';
const user = 'root';
const password = 'lucas1997';

//Aqui está sendo exportada uma função que precisa ser executada por quem 
// a chama para que a conexão seja feita.

module.exports = () => {
  return dbConn = mysql.createConnection({
      host: host,
      user: user,
      password: password, 
      database: database
    });
}