"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageControllers_1 = require("./controllers/messageControllers");
const Router = require('express').Router;
const router = Router();
//Rutas de mensajes
router.get('/', messageControllers_1.messagesControllers.getDataMessages);
router.get('/me/:id', messageControllers_1.messagesControllers.getDataMessageById);
router.delete('/me/:id', messageControllers_1.messagesControllers.deleteMessage);
router.get('/me', messageControllers_1.messagesControllers.getDataMyMessage);
router.post('/createMessage', messageControllers_1.messagesControllers.createMessage);
router.post('/comment/:idComment', messageControllers_1.messagesControllers.createComment);
//Rutas de reacciones
router.post('/reactions/:idComment', messageControllers_1.messagesControllers.createReaction);
exports.default = router;
//# sourceMappingURL=messageRouter.js.map