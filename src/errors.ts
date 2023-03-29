
export class PayriffError extends Error{
    public resultCode : string;
    constructor(resultCode : string, resultMessage: string){
        super(resultMessage);
        this.name = "Payriff Error";
        this.resultCode = resultCode;
    }

}