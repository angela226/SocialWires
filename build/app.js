"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* The entry point of the application. */
require('dotenv').config(); //esto obtiene la variables de entorno
const helmet_1 = require("./config/helmet"); // politicas para la seguridad, no permite injeccion de scripts
const body_parser_1 = __importDefault(require("body-parser")); // para aceptar y usar json
const router_1 = __importDefault(require("./router/router")); // maneja las rutas de todo el proyecto
const auth_controller_1 = require("./core/auth/auth.controller"); // controlador de rutas auth
const passport_utilities_1 = require("./utilities/passport.utilities"); // metodo de registro con passport 
const express_session_1 = __importDefault(require("express-session")); // libreria para manejar sesiones
const shemaValidator_1 = require("./utilities/schema/shemaValidator"); // validaciones para login y registro
const socket_1 = require("./socket/socket");
//import { Server } from 'socket.io';
const helpers_1 = require("./utilities/helpers/helpers");
const sessionexpress_1 = require("./config/sessionexpress");
const validations_1 = require("./core/middlewares/validations");
let passportStrategy = new passport_utilities_1.passportUtilities();
const passport = require('passport');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//const io = new Server(server, configSocket);
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const socketManager = socket_1.SocketManager.getInstance();
//socketManager.setIo(io);
app.use(express.json());
app.set('trust proxy', 1);
app.use((0, express_session_1.default)(sessionexpress_1.configSession));
app.use(body_parser_1.default.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public/dist')));
app.use(express.static(path.join(__dirname, './public/')));
app.use(morgan('dev'));
app.use(helmet(helmet_1.policy));
app.disable('x-powered-by');
app.use(passport.initialize());
//private routes
app.get('/prove', helpers_1.middlewareDefault);
app.post('/wires/api/v1/login', shemaValidator_1.schemaValidationLogin, validations_1.validationReport, auth_controller_1.AuthController.login);
app.post('/wires/api/v1/registerUser', passport.authenticate('register', { passReqToCallback: true }), helpers_1.middlewareDefault);
app.use('/wires/api/v1', auth_controller_1.AuthController.verifyTokenBearer, router_1.default);
app.post('/wires/api/v1/verifyToken', auth_controller_1.AuthController.verifyToken, helpers_1.middlewareDefault);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/dist/index.html'));
});
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server listening on port ${PORT}`);
}));
//# sourceMappingURL=app.js.map