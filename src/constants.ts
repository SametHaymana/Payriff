

export type methodType =   "cardSave" | "createOrder" | "getOrderInformation" | 
                    "getStatusOrder" | "refund" | "preAuth" | "reverse"|
                    "completeOrder" | "autoPay" | "autoPay" | "invoices" |
                    "get-invoice"| "transfer" | "topup";

export type currencyType =  "AZN" | "USD" | "EUR";
export type languageType =  "AZ" | "EN" | "RU" ; 


export type bodyType ={
    amount?: number,
    refundAmount?: number,
    approveURL?: string,
    cancelURL?: string,
    declineURL?: string,
    currencyType?: currencyType,
    description?: string,
    language?: languageType,
    languageType?: languageType,
    directPay?: boolean,
    senderCardUID?:string,
    installmentPeriod?: number,
    installmentProductType?: string,
    orderId?: number,
    sessionId?: string,
    cardUuid?: string,
    customMessage?: string,
    email?:string,
    expireDate?:Date,
    fullName?:string,
    phoneNumber?:string,
    sendSms?:boolean,
    uuid?:string,
    toMerchant?:string,

}