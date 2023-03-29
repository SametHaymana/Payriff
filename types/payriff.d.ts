import { languageType, currencyType } from "./constants";
export declare class Payriff {
    private merchant;
    private secret;
    baseUrl: string;
    approveURL: string;
    cancelURL: string;
    declineURL: string;
    constructor(merchant: string, secret: string, approveURL: string, cancelURL: string, declineURL: string);
    private sendRequest;
    cardSave(amount: number, currencyType: currencyType, language: languageType): Promise<any>;
    createOrder(amount: number, currencyType: currencyType, language: languageType, senderCardUID?: string): Promise<any>;
    getOrderInformation(orderId: number, sessionId: string, languageType: languageType): Promise<any>;
    getStatusOrder(orderId: number, sessionId: string, languageType: languageType): Promise<any>;
    refund(refundAmount: number, orderId: number, sessionId: string): Promise<any>;
    preAuth(amount: number, currencyType: currencyType, language: languageType, senderCardUID?: string): Promise<any>;
    reverse(amount: number, description: string, language: languageType, orderId: number, sessionId: string): Promise<any>;
    completeOrder(amount: number, description: string, language: languageType, orderId: number, sessionId: string): Promise<any>;
    autoPay(amount: number, cardUuid: string, description: string, orderId: number, sessionId: string): Promise<any>;
    invoices(amount: number, currencyType: currencyType, customMessage: string, description: string, email: string, expireDate: Date, fullName: string, languageType: languageType, phoneNumber: string, sendSms?: boolean): Promise<any>;
    getInvoice(uuid: string): Promise<any>;
    transfer(toMerchant: string, amount: number, description: string): Promise<any>;
    topup(phoneNumber: string, amount: number, description: string): Promise<any>;
}
