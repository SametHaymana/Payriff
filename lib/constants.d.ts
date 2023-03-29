export declare enum ResultCodes {
    SUCCESS = "00000",
    SUCCESS_GATEWAY = "00",
    SUCCESS_GATEWAY_APPROVE = "APPROVED",
    SUCCESS_GATEWAY_PREAUTH_APPROVE = "PREAUTH-APPROVED",
    WARNING = "01000",
    ERROR = "15000",
    INVALID_PARAMETERS = "15400",
    UNAUTHORIZED = "14010",
    TOKEN_NOT_PRESENT = "14013",
    INVALID_TOKEN = "14014"
}
export declare enum ResultMessages {
    OK = "OK",
    SUCCESS = "Operation performed successfully",
    ERROR = "Internal Error",
    UNAUTHORIZED = "Unauthorized",
    NOT_FOUND = "Not found",
    TOKEN_NOT_PRESENT = "Token not present",
    INVALID_TOKEN = "Invalid Token",
    TOKEN_EXPIRED = "Token expired",
    DEACTIVE_TOKEN = "Token is not active",
    LINK_EXPIRED = "Link is expired!",
    NO_RECORD_FOUND = "No record found!",
    NO_INVOICE_FOUND = "No invoice found!",
    APPLICATION_NOT_FOUND = "Application not found!",
    USER_NOT_FOUND = "User not found!",
    USER_ALREADY_EXISTS = "User already exists!",
    UNEXPECTED_GATEWAY_ERROR = "Occurred problem with Processing",
    INVALID_CREDENTIALS = "Username or Password is incorrect"
}
export interface payriffErrorData {
    code: string;
    message: string;
    route?: string;
    internalMessage?: string;
}
export type methodType = "cardSave" | "createOrder" | "getOrderInformation" | "getStatusOrder" | "refund" | "preAuth" | "reverse" | "completeOrder" | "autoPay" | "autoPay" | "invoices" | "get-invoice" | "transfer" | "topup";
export type currencyType = "AZN" | "USD" | "EUR";
export type languageType = "AZ" | "EN" | "RU";
export type bodyType = {
    amount?: number;
    refundAmount?: number;
    approveURL?: string;
    cancelURL?: string;
    declineURL?: string;
    currencyType?: currencyType;
    description?: string;
    language?: languageType;
    languageType?: languageType;
    directPay?: boolean;
    senderCardUID?: string;
    installmentPeriod?: number;
    installmentProductType?: string;
    orderId?: number;
    sessionId?: string;
    cardUuid?: string;
    customMessage?: string;
    email?: string;
    expireDate?: Date;
    fullName?: string;
    phoneNumber?: string;
    sendSms?: boolean;
    uuid?: string;
    toMerchant?: string;
};
