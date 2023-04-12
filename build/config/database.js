"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
require('dotenv').config();
console.log(process.env.HOST_DATABASE);
exports.database = {
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    decimalNumbers: true,
};
//# sourceMappingURL=database.js.map