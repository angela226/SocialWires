"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersRoutes_1 = __importDefault(require("./routes/privateRoutes/users/usersRoutes"));
const messageRouter_1 = __importDefault(require("./routes/privateRoutes/messages/messageRouter"));
const { Router } = require('express');
const router = Router();
router.use('/users', usersRoutes_1.default);
router.use('/messages', messageRouter_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map