import { messagesController } from './controllers/messageControllers';

const Router = require('express').Router;

const router = Router();
router.get('/', messagesController.getDataMessages);
router.get('/me/:id', messagesController.getDataMessageById);
router.delete('/me/:id', messagesController.deleteMessage);
router.get('/me', messagesController.getDataMyMessage);
router.post('/createMessage', messagesController.createMessage);

export default router;
