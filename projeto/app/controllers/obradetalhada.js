const dbConnection = require('../../config/dbConnection')
const {getPaintings, deletePainting} = require('../models/obradetalhada');
const {postInsert} = require('../models/insert');

module.exports.obradetalhada = (app, req, res, id) => {
    console.log('Estamos no controller da obra detalada');
    getPaintings(dbConnection(), [id], (error,result) =>{
         if(error) {
          logger.log({
            level:'error',
            message:error.message
          });
          let pagina = "<h1>Erro encontrado. Problemas com a conexão do banco de dados </h1>";
          res.status(500).send(pagina);
         }else {
          console.log("Esse é o resultado", result)
           res.render('obradetalhada.ejs', {paintings: result});
         }
    });
  }
   
module.exports.deletePainting = ( app, req, res, id) => {
  console.log("Estamos no controller do excluir ponto turistico")
  deletePainting(dbConnection(), [id], (error, res) =>{
    if (error) {
      logger.log({
        level:'error',
        message:error.message
      });
      let pagina = "<h1>Erro encontrado. Problemas com a conexão do banco de dados </h1>";
      res.status(500).send(pagina);
      } 
    })}

    module.exports.insertObra = (app, req, res,[nome,endereco,urlimagem]) => {
      console.log('Estamos no controller da insert obra');
      postInsert(dbConnection(),[nome, endereco, urlimagem], (error,result) =>{
           if(error) {
            logger.log({
              level:'error',
              message:error.message
            });
            let pagina = "<h1>Erro encontrado. Problemas com a conexão do banco de dados </h1>";
            res.status(500).send(pagina);
           }else {
             console.log(result)
           }
      })
  }
