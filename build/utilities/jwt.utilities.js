"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manage_token = void 0;
var jwt = require('jsonwebtoken');
exports.Manage_token = {
    sign: (values) => {
        let token = jwt.sign({
            data: JSON.stringify(values),
        }, 'secret', { expiresIn: '1000h' }, { algorithm: 'HS256' });
        return token;
    },
    verify: (values) => {
        try {
            let desencrypted = jwt.verify(values, 'secret', { algorithm: 'HS256' });
            return desencrypted;
        }
        catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return false;
            }
            if (err instanceof jwt.JsonWebTokenError) {
                return false;
            }
            if (err instanceof jwt.NotBeforeError) {
                return false;
            }
            return err;
        }
    },
    parse(token) {
        let decoded = jwt.verify(token, 'secret', { algorithm: 'HS256' });
        return JSON.parse(JSON.parse(decoded.data));
    },
};
//# sourceMappingURL=jwt.utilities.js.map