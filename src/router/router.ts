import { messagesController } from "./routes/privateRoutes/messages/controllers/messageControllers";
import usersRoutes from './routes/privateRoutes/users/usersRoutes';
import messagesRoutes from './routes/privateRoutes/messages/messageRouter';

const { Router } = require('express');
const router = Router();

router.use('/users', usersRoutes);
router.use('/messages', messagesRoutes);

export default router;
