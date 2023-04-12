"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersControllers_1 = require("./controllers/usersControllers");
const Router = require('express').Router;
const router = Router();
router.post('/getDataUsers', usersControllers_1.usersController.getDataUsers);
router.post('/getDataUser', usersControllers_1.usersController.getDataUser);
router.post('/user', usersControllers_1.usersController.createuser);
exports.default = router;
//# sourceMappingURL=usersRoutes.js.map