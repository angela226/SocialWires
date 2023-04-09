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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthController = void 0;
var express_validator_1 = require("express-validator");
var database_1 = require("../../database/database");
var constanst_1 = require("../../utilities/constanst");
var jwt_utilities_1 = require("../../utilities/jwt.utilities");
var helpers_1 = require("../../utilities/helpers/helpers");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
exports.AuthController = {
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, _a, email, password;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, database_1.pool.query("SELECT * FROM users WHERE ( email = ? )", [email], function (err, results, field) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, uuid_user, lastname, name_1, username, match, token, decodetoken, daysleft, err_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 6, , 7]);
                                        if (err) {
                                            res.status(200).json({ status: 401, err: err });
                                        }
                                        if (!(results.length > 0)) return [3 /*break*/, 5];
                                        _a = results[0], uuid_user = _a.uuid_user, lastname = _a.lastname, name_1 = _a.name, username = _a.username;
                                        return [4 /*yield*/, bcrypt.compare(password, results[0].password)];
                                    case 1:
                                        match = _b.sent();
                                        if (!match) return [3 /*break*/, 4];
                                        return [4 /*yield*/, jwt_utilities_1.Manage_token.sign(JSON.stringify({ uuid_user: uuid_user, lastname: lastname, name: name_1, username: username }))];
                                    case 2:
                                        token = _b.sent();
                                        return [4 /*yield*/, jwt.verify(token, 'secret')];
                                    case 3:
                                        decodetoken = _b.sent();
                                        daysleft = (0, helpers_1.convertFromMiliseconds)(decodetoken === null || decodetoken === void 0 ? void 0 : decodetoken.exp);
                                        res.status(200).json({ expires_in: daysleft, message: "Successfully logged in", access_token: token, status: true });
                                        return [3 /*break*/, 5];
                                    case 4:
                                        res.status(200).json({ status: 401, type: false, token: null });
                                        _b.label = 5;
                                    case 5:
                                        if (results.length == 0) {
                                            res.status(200).json({ status: 401, result: constanst_1.constantAnswer.USERNAME_PASSWORD_COMBINATION_ERROR, type: false });
                                        }
                                        return [3 /*break*/, 7];
                                    case 6:
                                        err_1 = _b.sent();
                                        return [2 /*return*/, err_1];
                                    case 7: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    register: function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); },
    verifyToken: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var token, verify, dataset, dataUser, _a, uuid_user, lastname, name_2, username;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) return [3 /*break*/, 7];
                    token = req.headers.authorization.split(' ')[1];
                    if (!token) return [3 /*break*/, 5];
                    return [4 /*yield*/, jwt_utilities_1.Manage_token.verify(token)];
                case 1:
                    verify = _b.sent();
                    if (!verify) return [3 /*break*/, 3];
                    dataset = jwt_utilities_1.Manage_token.parse(token);
                    return [4 /*yield*/, database_1.pool.query("SELECT * FROM users WHERE ( username = ? )", [dataset.username])];
                case 2:
                    dataUser = _b.sent();
                    _a = dataUser[0], uuid_user = _a.uuid_user, lastname = _a.lastname, name_2 = _a.name, username = _a.username;
                    res.status(200).json({ type: true, status: 200, user: { uuid_user: uuid_user, lastname: lastname, name: name_2, username: username, role: 'Administador' } });
                    return [3 /*break*/, 4];
                case 3:
                    res.status(200).json({ token: false, status: 401 });
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.status(200).json({ token: false, status: 401 });
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    res.status(200).json({ token: false, status: 401 });
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); },
    verifyTokenBearer: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var token, verify, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.headers.authorization);
                    if (!(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) return [3 /*break*/, 4];
                    token = req.headers.authorization.split(' ')[1];
                    if (!token) return [3 /*break*/, 2];
                    return [4 /*yield*/, jwt_utilities_1.Manage_token.verify(token)];
                case 1:
                    verify = _b.sent();
                    if (verify) {
                        _a = jwt_utilities_1.Manage_token.parse(token);
                        next();
                    }
                    else {
                        res.status(200).json({ token: false, status: 401 });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    res.status(200).json({ token: false, status: 401 });
                    _b.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    res.status(200).json({ token: false, status: 401 });
                    _b.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); }
};
