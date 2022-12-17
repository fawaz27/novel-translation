"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class AuthenticationTokenMissingException extends HttpException_1.HttpException {
    constructor() {
        super(401, 'Authentication token missing');
    }
}
exports.default = AuthenticationTokenMissingException;
