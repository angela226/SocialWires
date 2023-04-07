import { messagesControllers } from './controllers/messageControllers';

const Router = require('express').Router;

const router = Router();
router.get('/', messagesControllers.getDataMessages);
router.get('/me/:id', messagesControllers.getDataMessageById);
router.delete('/me/:id', messagesControllers.deleteMessage);
router.get('/me', messagesControllers.getDataMyMessage);
router.post('/createMessage', messagesControllers.createMessage);
router.post('/comment/:id', messagesControllers.createComment);
export default router;
