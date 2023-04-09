import { messagesControllers } from './controllers/messageControllers';

const Router = require('express').Router;

const router = Router();

//Rutas de mensajes
router.get('/', messagesControllers.getDataMessages);
router.get('/me/:id', messagesControllers.getDataMessageById);
router.delete('/me/:id', messagesControllers.deleteMessage);
router.get('/me', messagesControllers.getDataMyMessage);
router.post('/createMessage', messagesControllers.createMessage);
router.post('/comment/:idComment', messagesControllers.createComment);

//Rutas de reacciones
router.post('/reactions/:idComment', messagesControllers.createReaction);
export default router;
