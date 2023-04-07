import { Request, Response } from 'express';  


const { Router } = require('express');
const routerPublic = Router();

routerPublic.use('/home', ()=>{});


export default routerPublic;
