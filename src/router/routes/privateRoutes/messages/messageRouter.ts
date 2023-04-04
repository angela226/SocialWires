import { messagesController } from './controllers/messageControllers';

const Router = require('express').Router;

const router = Router();
router.get('/me', messagesController.getDataMessages);
router.get('/', messagesController.getDataMessages);
router.post('/createMessage', messagesController.createMessage);

export default router;
