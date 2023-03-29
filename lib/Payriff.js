"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payriff = void 0;
const axios_1 = require("axios");
const errors_1 = require("./errors");
class Payriff {
    constructor(merchant, secret, approveURL, cancelURL, declineURL) {
        this.merchant = merchant;
        this.secret = secret;
        this.approveURL = "";
        this.cancelURL = "";
        this.declineURL = "";
        this.baseUrl = "https://api.payriff.com/api/v2/";
        this.approveURL = approveURL;
        this.cancelURL = cancelURL;
        this.declineURL = declineURL;
    }
    sendRequest(method, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.post(this.baseUrl + method, {
                    body,
                    merchant: this.merchant
                }, {
                    headers: {
                        Authorization: this.secret
                    }
                });
                return res.data;
            }
            catch (error) {
                error = error.response;
                throw new errors_1.PayriffError(error.data.code, error.data.message);
            }
        });
    }
    cardSave(amount, currencyType, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                approveURL: this.approveURL,
                cancelURL: this.cancelURL,
                declineURL: this.declineURL,
                directPay: true,
                amount,
                currencyType,
                language,
            };
            return yield this.sendRequest("cardSave", body);
        });
    }
    createOrder(amount, currencyType, language, senderCardUID = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                approveURL: this.approveURL,
                cancelURL: this.cancelURL,
                declineURL: this.declineURL,
                directPay: true,
                amount,
                currencyType,
                language,
                senderCardUID,
                installmentPeriod: 0,
                installmentProductType: "BIRKART"
            };
            return yield this.sendRequest("createOrder", body);
        });
    }
    getOrderInformation(orderId, sessionId, languageType) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                languageType,
                orderId,
                sessionId
            };
            return yield this.sendRequest("getOrderInformation", body);
        });
    }
    getStatusOrder(orderId, sessionId, languageType) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                languageType,
                orderId,
                sessionId
            };
            return yield this.sendRequest("getOrderInformation", body);
        });
    }
    refund(refundAmount, orderId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                refundAmount,
                orderId,
                sessionId
            };
            return yield this.sendRequest("refund", body);
        });
    }
    preAuth(amount, currencyType, language, senderCardUID = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                approveURL: this.approveURL,
                cancelURL: this.cancelURL,
                declineURL: this.declineURL,
                directPay: false,
                amount,
                currencyType,
                language,
                senderCardUID,
                installmentPeriod: 0,
                installmentProductType: "BIRKART"
            };
            return yield this.sendRequest("preAuth", body);
        });
    }
    reverse(amount, description, language, orderId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                amount,
                description,
                language,
                orderId,
                sessionId
            };
            return yield this.sendRequest("reverse", body);
        });
    }
    completeOrder(amount, description, language, orderId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                amount,
                description,
                language,
                orderId,
                sessionId
            };
            return yield this.sendRequest("completeOrder", body);
        });
    }
    autoPay(amount, cardUuid, description, orderId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                amount,
                description,
                cardUuid,
                orderId,
                sessionId
            };
            return yield this.sendRequest("autoPay", body);
        });
    }
    invoices(amount, currencyType, customMessage, description, email, expireDate, fullName, languageType, phoneNumber, sendSms = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                amount,
                approveURL: this.approveURL,
                cancelURL: this.cancelURL,
                declineURL: this.declineURL,
                currencyType,
                customMessage,
                description,
                email,
                expireDate,
                fullName,
                languageType,
                phoneNumber,
                sendSms
            };
            return yield this.sendRequest("invoices", body);
        });
    }
    getInvoice(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                uuid
            };
            return yield this.sendRequest("get-invoice", body);
        });
    }
    transfer(toMerchant, amount, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                toMerchant,
                amount,
                description
            };
            return yield this.sendRequest("transfer", body);
        });
    }
    topup(phoneNumber, amount, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                phoneNumber,
                amount,
                description
            };
            return yield this.sendRequest("topup", body);
        });
    }
}
exports.Payriff = Payriff;
