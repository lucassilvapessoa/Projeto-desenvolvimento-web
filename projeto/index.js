const app = require('./config/server');
const routes = require('./app/routes/routes');
const userRoutes = require('./app/routes/usersRoutes');

// const routesAdmin = require('./app/routes/admin');

routes.home(app);
routes.tarsila(app);
routes.insertPainting(app);
routes.savePainting(app);
routes.getPainting(app);
routes.changePainting(app);
routes.deslogar(app)
routes.deletePainting(app)
routes.cadastrarPontoTuristico(app)

userRoutes.insertUser(app);
userRoutes.saveUser(app);
userRoutes.authUserForm(app);
userRoutes.authUser(app);