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
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportUtilities = void 0;
const database_1 = require("../database/database");
const helpers_1 = require("./helpers/helpers");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
class passportUtilities {
    constructor() {
        this.helpers = helpers_1.helpers;
        this.connection = database_1.pool;
        this.passportInit();
    }
    passportInit() {
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
        passport.use('register', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        }, (req, user, pass, done) => __awaiter(this, void 0, void 0, function* () {
            const { username, phone, email, password, name, lastname } = req.body;
            let newUser = {
                uuid_user: new Date().getTime(),
                username: username,
                name: name,
                lastname: lastname,
                password,
                email,
                phone,
                id_role: 1,
            };
            let checkUser = yield database_1.pool.query(`SELECT * FROM users WHERE ( username = ? );`, username);
            try {
                if (checkUser.length > 0) {
                    req.res.send('already exist username');
                    return done(null, 'already exist username');
                }
                else {
                    newUser.password = yield this.helpers.encryptPassword(password);
                    const result = yield database_1.pool.query('INSERT INTO users SET ? ', newUser);
                    req.res.send('User added');
                    return done(null, newUser);
                }
            }
            catch (err) {
                console.log(err);
                req.res.send('error');
            }
        })));
    }
}
exports.passportUtilities = passportUtilities;
//# sourceMappingURL=passport.utilities.js.map