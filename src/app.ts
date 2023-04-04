/* The entry point of the application. */
require('dotenv').config(); //esto obtiene la variables de entorno
import { NextFunction, Request, Response } from 'express';  // tipos typescript

import { policy } from './config/helmet'; // politicas para la seguridad, no permite injeccion de scripts
import bodyParser from 'body-parser'; // para aceptar y usar json
import router from './router/router'; // maneja las rutas de todo el proyecto
import { AuthController } from './core/auth/auth.controller';  // controlador de rutas auth
import { passportUtilities } from './utilities/passport.utilities'; // metodo de registro con passport 
import session from 'express-session'; // libreria para manejar sesiones
import routerPublic from './router/publicRoutes'; // manejar rutas publicas
import { schemaValidationLogin, schemaValidationRegister } from './utilities/schema/shemaValidator'; // validaciones para login y registro
import { SocketManager } from './socket/socket'; 
import { Server } from 'socket.io';
import { middlewareDefault } from './utilities/helpers/helpers';
import { configSession } from './config/sessionexpress';
import { configSocket } from './config/socket';
import { validationRegister, validationReport } from './core/middlewares/validations';

let passportStrategy = new passportUtilities();

const passport = require('passport');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, configSocket);
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const socketManager = SocketManager.getInstance();
socketManager.setIo(io);

app.use(express.json());
app.set('trust proxy', 1);
app.use(session(configSession));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public/dist')));
app.use(express.static(path.join(__dirname, './public/')));
app.use(morgan('dev'));
app.use(helmet(policy));
app.disable('x-powered-by');
app.use(passport.initialize());

//private routes
app.get('/prove', middlewareDefault);
app.post('/wires/api/v1/login',schemaValidationLogin ,validationReport,AuthController.login);
// app.post('/wires/api/v1/login',schemaValidationLogin ,AuthController.login);
app.post('/wires/api/v1/registerUser', passport.authenticate('register', { passReqToCallback: true }), middlewareDefault);
app.use('/wires/api/v1', AuthController.verifyTokenBearer, router);
app.post('/wires/api/v1/verifyToken', AuthController.verifyToken, middlewareDefault);
app.use('/wiresapi/v1', routerPublic);
app.get('/*', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, './public/dist/index.html'));
});

server.listen(PORT, async () => {
	console.log(`Server listening on port ${PORT}`);
});
