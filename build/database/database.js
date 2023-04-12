"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const database_1 = require("../config/database");
// import { AppDataSource} from './database.orm'
const mysql = require('mysql2');
const { promisify } = require('util');
exports.pool = mysql.createPool(database_1.database);
exports.pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ERR_CON_COUNT_ERROR') {
            console.log('DATABASE HAS TOO MANY CONNECTION');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('DATABASE CONNECTION WAS REFUSED');
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
        if (err.code == 'ER_BAD_DB_ERROR') {
            console.log('DATABASE DOSNT EXIST');
        }
    }
    if (connection) {
        connection.release();
        console.log('DB IS CONNECTED');
    }
    return;
});
exports.pool.query = promisify(exports.pool.query);
//# sourceMappingURL=database.js.map