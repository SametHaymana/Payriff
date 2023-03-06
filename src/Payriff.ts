import axios from "axios"; 
import {methodType, languageType, currencyType,bodyType} from "./constants";
import {PayriffError} from "./errors"


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
        try {
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

        } catch (error: any) {
            error = error.response
            throw new PayriffError(error.data.code ,error.data.message);
   
        }

        
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
        email: string, expireDate: Date, fullName: string, languageType: languageType, phoneNumber: string,
        sendSms: boolean = true){

        const body : bodyType = {
            amount,
            approveURL : this.approveURL,
            cancelURL : this.cancelURL,
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
        }


        return await this.sendRequest("invoices", body)

    }

    async getInvoice(uuid: string){
        const body : bodyType={
            uuid
        }

        return await this.sendRequest("get-invoice", body)
    }

    async transfer(toMerchant: string, amount: number,  description: string){
        const body : bodyType={
            toMerchant,
            amount,
            description
        }

        return await this.sendRequest("transfer", body)
    }

    async topup(phoneNumber: string, amount: number, description: string){
        const body : bodyType={
            phoneNumber,
            amount,
            description
        }

        return await this.sendRequest("topup", body)
    }


}