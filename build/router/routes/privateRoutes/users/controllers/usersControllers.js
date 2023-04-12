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
exports.usersController = void 0;
const database_1 = require("../../../../../database/database");
const usersController = {
    getDataUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield database_1.pool.promise().query('SELECT uuid_user,username,name,lastname,address,phone,email,id_photo_perfil,id_role,updated_at FROM users');
        console.log(users[0]);
        res.status(200).json({ type: true, status: 200, data: users[0] });
    }),
    createuser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstname, lastname, username, email, password } = req.body;
        console.log(firstname, lastname, username, email, password);
        res.status(200);
    }),
    getDataUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
};
exports.usersController = usersController;
//# sourceMappingURL=usersControllers.js.map