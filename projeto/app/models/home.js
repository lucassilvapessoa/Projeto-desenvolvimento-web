module.exports = {
  getPaintings: (connection, callback) => {
    const sql = 'select * from pontoturistico;';
    connection.query(sql, callback);
  },
  getPainting: (paintingId, connection, callback) => {
    const sql = `select * from pontoturistico where idpontoturistico='${paintingId}';`;
    console.log(sql);
    connection.query(sql, callback);
  },

  addPainting: (painting, connection, callback) => {
    const sql = `insert into pontoturistico (nome, endereco, urlimagem) VALUES ("${painting.nome}", "${painting.endereco}", "${painting.urlimagem}");`
    connection: (painting, connection, callback) => {
    const sql = n.query(sql, callback);
  }
},

  changePainting: (painting, connection,  callback) => {
     const sql = `UPDATE pontoturistico SET nome = "${painting.nome}",   endereco = "${painting.endereco}",urlimagem = "${painting.urlimagem}" WHERE idpontoturistico=${painting.idpontoturistico}`;
     console.log(sql);
     connection.query(sql, callback);
  }
}  
