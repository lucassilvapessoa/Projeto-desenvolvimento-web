const { check, validationResult } = require('express-validator');
const {home,addPaintingController,getPaintingController,changeFormPaintingController, changePaintingController} = require('../controllers/home');
const {deletePainting, insertObra} = require('../controllers/obradetalhada')

module.exports = {
  home: (app) => {
    app.get('/', function (req, res) {
      console.log('Usuário logado?', req.session.loggedIn);
      console.log('Usuario ?', req.session.user)
      // res.render('home.ejs');
      home(app, req, res); //Controller da home
    });
  },
  tarsila: (app) => {
    app.get('/tarsila', function (req, res) {
      if (req.session.user == undefined){
        let pagina = '<html><body>O usuário deve estar logado para acessar a pagina</body></html>'
        res.send(pagina)
      }else {
        res.render('tarsila.ejs');
      }
    });
  },
  getPainting: (app) => {
    app.get('/obradearte', (req, res) => {
      if (req.session.user == undefined){
        let pagina = '<html><body>O usuário deve estar logado para acessar a pagina</body></html>'
        res.send(pagina)} else {
          getPaintingController(app, req, res);
        }
    });
  },
  changePainting: (app) => {
    app.get('/alterarobradearte', (req, res) => {
      if (req.session.user == undefined){
        let pagina = '<html><body>O usuário deve estar logado para acessar a pagina</body></html>'
        res.send(pagina)} else {
        console.log("Estamos na rota de alterar o ponto turistico")
      changeFormPaintingController(app, req, res);
        }
    });
  },
  insertPainting: (app) => {
    app.post('/inserirobra',  [
      check('nome').notEmpty({ min: 5 }).withMessage('Nome deve ter no mínimo 5 caracteres.'),
      check('endereco').notEmpty({min:5}).withMessage("Endereco deve ser preenchido"),
      check('urlimagem').notEmpty({min: 5}).withMessage("Url deve ser preenchida")
    ], function (req, res) {
      console.log("Entrei na rota de inserir ponto turistico")
      if (req.session.user == undefined){
        let pagina = '<html><body>O usuário deve estar logado para acessar a pagina</body></html>'
        res.send(pagina)} else {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
          console.log('Entrei no erro');
          const errors = validation.array();
          res.render('insertPainting.ejs', { errors: errors, painting: {}});

        }else{
          if(req.query.update){
            console.log("Vou atualizar a obra")
            changePaintingController(app, req, res);
          }else {
            insertObra(app,req,res,[req.body.nome, req.body.endereco,req.body.urlimagem], {errors:{}});
            res.redirect('/');
          }
        }
      }
    });
  },

  cadastrarPontoTuristico: (app) => {
      app.get('/cadastrar', function(req, res){
        console.log("Rota para mostrar a pagina de cadastro do ponto turistico");
        if (req.session.user == undefined){
          let pagina = '<html><body>O usuário deve estar logado para acessar a pagina</body></html>'
          res.send(pagina)
      }else {
          res.render('insertPainting',{errors:{}, painting:{}});
      }
    })},
  
  savePainting: (app) => {
    app.post('/obra/salvar',
      [
        check('nome').notEmpty({ min: 5 }).withMessage('Nome deve ter no mínimo 5 caracteres.'),
        check('endereco').notEmpty({min:5}).withMessage("Endereco deve ser preenchido"),
        check('urlimagem').notEmpty({min: 5}).withMessage("Url deve ser preenchida")
      ], (req, res) => {

        if (req.session.user == undefined){
        let pagina = '<html><body>O usuário deve estar logado para acessar a pagina</body></html>'
        res.send(pagina)} else {
        const validation = validationResult(req);
        const painting = req.body;
        const operation = req.query.op;
        console.log('Operation', operation);
        if (!validation.isEmpty()) {
          console.log('Entrei no erro');
          const errors = validation.array();
          res.render('insertPainting.ejs', { errors: errors, painting: painting, op: operation });
        } else {
          console.log(operation);
          switch (operation) {
            case 'i': addPaintingController(app, req, res); break;
            case 'c': changePaintingController(app, req, res); break;
            default: console.log('Operação não prevista');
          }
        }
      }
      })
  },
  obradetalhada:(app) => app.get('/obradearte', function (req, res){
    console.log("Entrei na rota ponto turistico");
    obradetalhada(app, req, res, req.query.idobra);
 }),
 
  deslogar: (app) => {
    app.get('/deslogar', function (req, res) {
      console.log("Deslogando da sessão")
      req.session.destroy();
      res.redirect('/');
  })},

  deletePainting: (app) => {
    app.get('/delete', function (req, res) {
      console.log("Entrei na rota de excluir ponto turistico");
     deletePainting(app, req,res,req.query.idpontoturistico);
     res.redirect('/');
    })}}