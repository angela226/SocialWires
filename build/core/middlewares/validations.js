"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationReport = exports.validationRegister = void 0;
const express_validator_1 = require("express-validator");
const validationRegister = (req, res, next) => {
    console.log(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    else {
        next();
        return res.status(200).json({ errors: errors.array() });
    }
};
exports.validationRegister = validationRegister;
const validationReport = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        res.status(422).json({ errores: errores.array() });
    }
    next();
};
exports.validationReport = validationReport;
//# sourceMappingURL=validations.js.map