import axios from "axios"; 



export enum ResultCodes {
    SUCCESS = "00000",
    SUCCESS_GATEWAY = "00",
    SUCCESS_GATEWAY_APPROVE = "APPROVED",
    SUCCESS_GATEWAY_PREAUTH_APPROVE = "PREAUTH-APPROVED",
    WARNING = "01000",
    ERROR = "15000",
    INVALID_PARAMETERS = "15400",
    UNAUTHORIZED = "14010",
    TOKEN_NOT_PRESENT = "14013",
    INVALID_TOKEN = "14014",
}

export enum ResultMessages {
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
    INVALID_CREDENTIALS = "Username or Password is incorrect",
}


type methodType =   "cardSave" | "createOrder" | "getOrderInformation" | 
                    "getStatusOrder" | "refund" | "preAuth" | "reverse"|
                    "completeOrder" | "autoPay" | "autoPay" | "invoices";

type currencyType =  "AZN" | "USD" | "EUR";
type languageType =  "AZ" | "EN" | "RU" ; 


type bodyType ={
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
    customMessage?: string

}






export class Payriff{


    baseUrl : string;
    approveURL : string = "";
    cancelURL : string = "";
    declineURL : string = "";


    constructor(private merchant: string , private secret:string, approveURL: string, 
        cancelURL: string, declineURL: string){
        this.baseUrl = "https://api.payriff.com/api/v2/";
        
        this.approveURL = approveURL;
        this.cancelURL = cancelURL;
        this.declineURL = declineURL;

    }



    private async sendRequest (method : methodType , body: bodyType ){
        
        

        const res = await axios.post(
            this.baseUrl + method,
            {
                body,
                merchant : this.merchant 
            },
            {
                headers:{
                    Authorization: this.secret
                }
            }
        )



        return res.data;
    }




    async cardSave(amount: number, currencyType: currencyType , language: languageType){

        const body : bodyType = {
            approveURL : this.approveURL,
            cancelURL : this.cancelURL,
            declineURL: this.declineURL,
            directPay: true,   
            amount,
            currencyType,
            language,
        }

        return await this.sendRequest("cardSave", body)

    }


    async createOrder(amount: number, currencyType: currencyType , language: languageType, senderCardUID: string = ""){

        const body : bodyType = {
            approveURL : this.approveURL,
            cancelURL : this.cancelURL,
            declineURL: this.declineURL,
            directPay: true,   
            amount,
            currencyType,
            language,
            senderCardUID,

            installmentPeriod: 0,
            installmentProductType: "BIRKART"

        }

        return await this.sendRequest("createOrder", body)
    } 


    async getOrderInformation(orderId: number, sessionId:string , languageType: languageType){
        const body : bodyType = {
            languageType,
            orderId,
            sessionId
        }

        return await this.sendRequest("getOrderInformation", body);
    }

    async getStatusOrder(orderId: number, sessionId:string , languageType: languageType){
        const body : bodyType = {
            languageType,
            orderId,
            sessionId
        }

        return await this.sendRequest("getOrderInformation", body);
    }


    async refund(refundAmount: number,orderId: number, sessionId:string){
        const body : bodyType = {
            refundAmount,
            orderId,
            sessionId
        }

        return await this.sendRequest("refund", body);

    }

    async preAuth(amount: number, currencyType: currencyType , language: languageType, senderCardUID: string = ""){

        const body : bodyType = {
            approveURL : this.approveURL,
            cancelURL : this.cancelURL,
            declineURL: this.declineURL,
            directPay: false,   
            amount,
            currencyType,
            language,
            senderCardUID,
            installmentPeriod: 0,
            installmentProductType: "BIRKART"

        }

        return await this.sendRequest("preAuth", body);

    }

    async reverse(amount: number, description: string, language: languageType, orderId: number, sessionId:string ){
        const body : bodyType = {
            amount,
            description,
            language,
            orderId,
            sessionId
        }

        return await this.sendRequest("reverse", body)
    }

    async completeOrder(amount: number, description: string, language: languageType,orderId: number, sessionId:string ){
        const body : bodyType = {
            amount,
            description,
            language,
            orderId,
            sessionId
        }

        return await this.sendRequest("completeOrder", body)
    }


    async autoPay(amount: number, cardUuid: string, description: string,orderId: number, sessionId:string ){
        const body : bodyType = {
            amount,
            description,
            cardUuid,
            orderId,
            sessionId
        }


        return await this.sendRequest("autoPay", body)

    }

    async invoices(amount: number,currencyType: currencyType,customMessage: string, description: string,
        email: string){

        const body : bodyType = {
            amount,
            approveURL : this.approveURL,
            cancelURL : this.cancelURL,
            declineURL: this.declineURL,
            currencyType,
            customMessage,
            description,

        }


        return await this.sendRequest("autoPay", body)

    }


}