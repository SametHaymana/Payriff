"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayriffError = void 0;
class PayriffError extends Error {
    constructor(resultCode, resultMessage) {
        super(resultMessage);
        this.name = "Payriff Error";
        this.resultCode = resultCode;
    }
}
exports.PayriffError = PayriffError;
