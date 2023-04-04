import { messagesController } from './controllers/messageControllers';

const Router = require('express').Router;

const router = Router();
router.get('/getDataMessages', messagesController.getDataMessages);
router.post('/createMessage', messagesController.createMessage);

export default router;
