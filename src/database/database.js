"use strict";
exports.__esModule = true;
exports.pool = void 0;
var database_1 = require("../config/database");
// import { AppDataSource} from './database.orm'
var mysql = require('mysql2');
var promisify = require('util').promisify;
exports.pool = mysql.createPool(database_1.database);
exports.pool.getConnection(function (err, connection) {
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
