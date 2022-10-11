const dbConnection = require('../../config/dbConnection');
const { getPaintings, addPainting, changePainting, getPainting } = require('../models/home');

module.exports.home = (app, req, res) => {
  //aqui vamos fazer a chamada para o model do banco de dados. 
  console.log('[Controller Home]');
  dbConn = dbConnection();
  getPaintings(dbConn, (error, result) => {
    console.log(error);
    console.log("Usuario na controller home ", req.session.user)
    res.render('home.ejs', { paintings: result, user:req.session.user});
  })
};

module.exports.addPaintingController = (app, req, res) => {
  console.log('[Controller Home Add Painting]');
  let painting = req.body;
  console.log(painting);
  dbConn = dbConnection();
  addPainting(painting, dbConn, (error, result) => {
    // res.render('home.ejs', { paintings: result });
    res.redirect('/');
  });
};

module.exports.changePaintingController = (app, req, res) => {
  console.log('Change Painting Controller', req.query);
  let painting = req.body;
  painting.idpontoturistico = req.query.idpontoturistico;
  dbConn = dbConnection();
  changePainting(painting, dbConn , (error, result)=> {
    res.redirect('/');
  });
};

module.exports.getPaintingController = (app, req, res) => {
  console.log('[Controller Home Get Painting]');
  let paintingId = req.query.idpontoturistico;
  console.log(paintingId);
  dbConn = dbConnection();
  getPainting(paintingId, dbConn, (error, result) => {
    res.render('showPainting.ejs', { painting: result });
  });
};

module.exports.changeFormPaintingController = (app, req, res) => {
  console.log('[Controller Home Change Painting]');
  console.log("Estamos no controller de alterar ponto turistico")
  let paintingId = req.query.idpontoturistico;
  dbConn = dbConnection();
  getPainting(paintingId, dbConn, (error, result) => {
    let painting = result[0];
    console.log(result);
    res.render('updatePainting', { painting: painting, errors: error , op: 'c'});
  });
};