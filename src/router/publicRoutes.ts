import { Request, Response } from 'express';
import homeRoutes from './routes/publicRoutes/home/homeRoutes';

const { Router } = require('express');
const routerPublic = Router();

routerPublic.use('/home', homeRoutes);

export default routerPublic;
