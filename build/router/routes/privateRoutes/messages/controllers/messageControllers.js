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
exports.messagesControllers = void 0;
const database_1 = require("../../../../../database/database");
//import { request } from 'http';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messagesControllers = {
    getDataMessageById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id_message = req.params.id;
            const messages = yield database_1.pool.query('SELECT * FROM messages WHERE id = ?', [id_message]);
            res.send(messages);
        }
        catch (err) {
            res.status(404);
        }
    }),
    getDataMyMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ mensaje: 'Token de portador no proporcionado' });
        }
        try {
            //Aqui obtenemos el token de tipo bearer
            const decoded = jsonwebtoken_1.default.verify(token, 'secret');
            const unescapedStr = JSON.parse(JSON.parse(decoded.data));
            const messages = yield database_1.pool.query(`SELECT * FROM messages WHERE user_id = '${unescapedStr.uuid_user}'`);
            res.status(200).send(messages);
        }
        catch (error) {
            res.status(401).json({ mensaje: error });
        }
    }),
    //con este se obtiene todos los mensajes
    getDataMessages: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            res.status(401).json({ mensaje: 'Token de portador no proporcionado' });
        }
        try {
            //Aqui obtenemos el token de tipo bearer
            const decoded = jsonwebtoken_1.default.verify(token, 'secret');
            const unescapedStr = JSON.parse(JSON.parse(decoded.data));
            const messages = yield database_1.pool.query(`SELECT m.id, m.user_id, m.title, m.text, m.createdAt,
			CONCAT('[', GROUP_CONCAT(JSON_OBJECT('comment', c.comment)), ']') AS comments,
			CONCAT('[', GROUP_CONCAT(JSON_OBJECT('reaction', r.reaction)), ']') AS reactions
	 FROM messages m
	 LEFT JOIN comments c ON m.id = c.message_id
	 LEFT JOIN reactions r ON m.id = r.message_id
	 
	 GROUP BY m.id`);
            res.status(200).send(messages);
        }
        catch (error) {
            res.status(401).json({ mensaje: error });
        }
    }),
    deleteMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id_message = req.params.id;
        const messages = yield database_1.pool.query('DELETE FROM messages WHERE id = ?;', [id_message]);
        res.status(200).json({ status: 200, delete: true });
    }),
    createMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
        if (!token) {
            res.status(401).json({ mensaje: 'Token de portador no proporcionado' });
        }
        try {
            //Aqui obtenemos el token de tipo bearer
            const decoded = jsonwebtoken_1.default.verify(token, 'secret');
            const unescapedStr = JSON.parse(JSON.parse(decoded.data));
            //obtenemos la data que nos envia el front
            const { title, text } = req.body;
            //aqui se insertan los datos en la base de datos
            const { result } = yield database_1.pool.promise().query('INSERT INTO messages (user_id, title, text) VALUES (?, ?, ?)', [unescapedStr.uuid_user, title, text]);
            const createdAt = new Date().toISOString();
            const message = {
                user: unescapedStr.uuid_user,
                title,
                text,
                createdAt
            };
            res.status(200).json(message);
        }
        catch (error) {
            res.status(401).json({ mensaje: error });
        }
    }),
    createReaction: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.params.idComment) {
                const idMessage = req.params.idComment;
                const { reaction } = req.body;
                const { result } = yield database_1.pool.promise().query('INSERT INTO reactions  (message_id, reaction) VALUES (?, ?)', [parseInt(idMessage), reaction]);
                res.status(200).json({ coment: 'save successfully' });
            }
        }
        catch (error) {
            res.status(200).json(error);
        }
    }),
    createComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.params.idComment) {
                const idMessage = req.params.idComment;
                const { comment } = req.body;
                const { result } = yield database_1.pool.promise().query('INSERT INTO comments  (message_id, comment) VALUES (?, ?)', [parseInt(idMessage), comment]);
                res.status(200).json({ coment: 'save successfully' });
            }
        }
        catch (error) {
            res.status(200).json(error);
        }
    })
};
exports.messagesControllers = messagesControllers;
//# sourceMappingURL=messageControllers.js.map