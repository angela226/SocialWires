"use strict";
exports.__esModule = true;
exports.validationReport = exports.validationRegister = void 0;
var express_validator_1 = require("express-validator");
var validationRegister = function (req, res, next) {
    console.log(req);
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    else {
        next();
        return res.status(200).json({ errors: errors.array() });
    }
};
exports.validationRegister = validationRegister;
var validationReport = function (req, res, next) {
    var errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        res.status(422).json({ errores: errores.array() });
    }
    next();
};
exports.validationReport = validationReport;
