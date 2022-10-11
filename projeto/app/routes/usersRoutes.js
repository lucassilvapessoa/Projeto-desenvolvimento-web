const { check, validationResult } = require('express-validator');
const { addUserController, authUserController } = require('../controllers/users');

module.exports = {
    insertUser: (app) => {
        app.get('/inserirusuario', function (req, res) {
            res.render('insertUser.ejs', { user: {}, errors: {} });
        });
    },
    saveUser: (app) => {
        app.post('/salvarusuario',
            [
                check('email').isEmail().normalizeEmail().withMessage('Email deve ser válido!'),
                check('password').isLength({ min: 5, max: 20 }).withMessage('Password deve ter no mínimo 5 e no máximo 20 caracteres'),
                check('confirmPassword').custom((value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error('As passwords digitadas não são iguais!');
                    }
                    // Indicates the success of this synchronous custom validator
                    return true;
                })
            ], (req, res) => {
                const validation = validationResult(req);
                const user = req.body;
                console.log(user);
                if (!validation.isEmpty()) {
                    const errors = validation.array();
                    res.render('insertUser.ejs', { errors: errors, user: user });
                } else {
                    addUserController(app, req, res);
                }
            })
    },
    authUserForm: (app) => {
        app.get('/formulariodeautenticacao', function (req, res) {
            res.render('auth.ejs', { user: {}, errors: {} });
        });
    },
    authUser: (app) => {
        app.post('/autenticarusuario',
            [
                check('email').isEmail().normalizeEmail().withMessage('Email deve ser válido!')
            ], (req, res) => {
                const validation = validationResult(req);
                const user = req.body;
                if (!validation.isEmpty()) {
                    const errors = validation.array();
                    res.render('auth.ejs', { errors: errors, user: user });
                } else {
                    authUserController(app, req, res);
                }
            })
    },
    

}
