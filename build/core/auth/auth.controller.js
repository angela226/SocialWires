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
exports.AuthController = void 0;
const express_validator_1 = require("express-validator");
const database_1 = require("../../database/database");
const constanst_1 = require("../../utilities/constanst");
const jwt_utilities_1 = require("../../utilities/jwt.utilities");
const helpers_1 = require("../../utilities/helpers/helpers");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.AuthController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        const { email, password } = req.body;
        yield database_1.pool.query(`SELECT * FROM users WHERE ( email = ? )`, [email], (err, results, field) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (err) {
                    res.status(200).json({ status: 401, err });
                }
                if (results.length > 0) {
                    const { uuid_user, lastname, name, username } = results[0];
                    const match = yield bcrypt.compare(password, results[0].password);
                    if (match) {
                        let token = yield jwt_utilities_1.Manage_token.sign(JSON.stringify({ uuid_user, lastname, name, username }));
                        let decodetoken = yield jwt.verify(token, 'secret');
                        let daysleft = (0, helpers_1.convertFromMiliseconds)(decodetoken === null || decodetoken === void 0 ? void 0 : decodetoken.exp);
                        res.status(200).json({ expires_in: daysleft, message: "Successfully logged in", access_token: token, status: true });
                    }
                    else {
                        res.status(200).json({ status: 401, type: false, token: null });
                    }
                }
                if (results.length == 0) {
                    res.status(200).json({ status: 401, result: constanst_1.constantAnswer.USERNAME_PASSWORD_COMBINATION_ERROR, type: false });
                }
            }
            catch (err) {
                return err;
            }
        }));
        // if (!errors.isEmpty()) {
        // }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
    verifyToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            if (token) {
                let verify = yield jwt_utilities_1.Manage_token.verify(token);
                if (verify) {
                    const dataset = jwt_utilities_1.Manage_token.parse(token);
                    const dataUser = yield database_1.pool.query(`SELECT * FROM users WHERE ( username = ? )`, [dataset.username]);
                    const { uuid_user, lastname, name, username } = dataUser[0];
                    res.status(200).json({ type: true, status: 200, user: { uuid_user, lastname, name, username, role: 'Administador' } });
                }
                else {
                    res.status(200).json({ token: false, status: 401 });
                }
            }
            else {
                res.status(200).json({ token: false, status: 401 });
            }
        }
        else {
            res.status(200).json({ token: false, status: 401 });
        }
    }),
    verifyTokenBearer: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.headers.authorization);
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            if (token) {
                let verify = yield jwt_utilities_1.Manage_token.verify(token);
                if (verify) {
                    const {} = jwt_utilities_1.Manage_token.parse(token);
                    next();
                }
                else {
                    res.status(200).json({ token: false, status: 401 });
                }
            }
            else {
                res.status(200).json({ token: false, status: 401 });
            }
        }
        else {
            res.status(200).json({ token: false, status: 401 });
        }
    }),
};
//# sourceMappingURL=auth.controller.js.map