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
exports.convertFromMiliseconds = exports.normalizeWords = exports.middlewareDefault = exports.helpers = void 0;
const bcrypt = require('bcryptjs');
exports.helpers = {
    encryptPassword: (password) => __awaiter(void 0, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        const hash = yield bcrypt.hash(password, salt);
        return hash;
    }),
    matchPassword: (password, savedPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield bcrypt.compare(password, savedPassword);
        }
        catch (err) {
            return err;
        }
    }),
    verifyUser: (pool, res, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        res.json({ type: true, token: 'token' });
    }),
    file_name: (fileName) => __awaiter(void 0, void 0, void 0, function* () {
        let onlyName = fileName.split('.')[0];
        return onlyName;
    }),
    file_extension: (filename) => __awaiter(void 0, void 0, void 0, function* () {
        const documento = /(pdf|docx|html|zip|svg|avi)/g;
        const image = /(png|PNG|JPG|jpg|jpeg|web|gif|tif)/g;
        const audio = /(mp3)/g;
        const video = /(mpeg|mp4)/g;
        let ext = /\.[a-z]+$/i.exec(filename);
        let type = '';
        if (ext != null && ext.length > 0) {
            if (documento.test(ext[0]))
                type = 'documento';
            if (image.test(ext[0]))
                type = 'image';
            if (audio.test(ext[0]))
                type = 'audio';
            if (video.test(ext[0]))
                type = 'video';
        }
        let dataExt = { ext: ext, typeFile: type };
        return dataExt;
    }),
    generateId: ({ type }) => {
        const typeid = {
            number: new Date().getTime().toString(),
            string: Math.random().toString(36).substr(2, 18),
        };
        const typeIdDefault = typeid.string;
        return typeid[type] || typeIdDefault;
    },
};
const middlewareDefault = (req, res, next) => {
    res.status(200).json({ type: true, status: 200, message: 'Middleware default' });
};
exports.middlewareDefault = middlewareDefault;
const normalizeWords = (word) => {
    const cadenaNormalizada = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return cadenaNormalizada;
};
exports.normalizeWords = normalizeWords;
const convertFromMiliseconds = (expInSeconds = 0) => {
    const expInMilliseconds = expInSeconds * 1000;
    // Crear una nueva fecha utilizando la marca de tiempo en milisegundos
    const expDate = new Date(expInMilliseconds);
    // Obtener la fecha actual
    const currentDate = new Date();
    // Calcular la diferencia de tiempo en milisegundos entre la fecha actual y la fecha de expiración
    const timeDiffInMilliseconds = expDate.getTime() - currentDate.getTime();
    // Calcular la cantidad de días restantes
    const daysLeft = Math.floor(timeDiffInMilliseconds / (1000 * 60 * 60 * 24));
    return daysLeft;
};
exports.convertFromMiliseconds = convertFromMiliseconds;
//# sourceMappingURL=helpers.js.map