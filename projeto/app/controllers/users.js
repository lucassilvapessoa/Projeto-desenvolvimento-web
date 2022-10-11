const dbConnection = require('../../config/dbConnection');
const crypto = require('crypto');
const { addUser, authUser } = require('../models/users');

module.exports.addUserController = (app, req, res) => {
    console.log('[Controller User Add User]');
    let user = req.body;
    console.log(user);
    let passwordCrypto = crypto.createHash('md5').update(user.password).digest('hex');
    console.log(passwordCrypto);
    user.password = passwordCrypto;
    dbConn = dbConnection();
    addUser(user, dbConn, (error, result) => {
        if (error) {
            console.log(error);
            res.end('Erro ao cadastrar usuário !');
        } else {
            res.end('Usuário cadastrado com sucesso !');
        }
    });
};

module.exports.authUserController = (app, req, res) => {
    console.log('[Controller User Auth User]');
    let user = req.body;
    let passwordCrypto = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = passwordCrypto;
    dbConn = dbConnection();
    authUser(user, dbConn, (error, result) => {
        if (error) {
            console.log(error);
            res.end('Erro ao autenticar usuário !');
        } else {
            console.log(result);
            if(result.length > 0){
                req.session.loggedIn = true;
                req.session.user = req.body.email;
                res.redirect('/');
            } else {
                res.end('Usuário não autenticado !');
            }
        }
    });
};