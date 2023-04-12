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
exports.verifyToken = void 0;
const jwt_utilities_1 = require("../../utilities/jwt.utilities");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { token } = req.body;
    let verify = yield jwt_utilities_1.Manage_token.verify(token);
    if (verify) {
        let dataSet = jwt_utilities_1.Manage_token.parse(token);
        next(dataSet);
    }
    else {
        res.status(401).json({ token: false });
    }
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map