import { MsgConst } from "src/.const/msg.const";

export class Result { 
    code: number;

    message: string;
    
    data: any;

    constructor(code: number, message: string, data: any) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    static success(message: string, data: any = null): Result {
        return new Result(200, message, data);
    }

    static fail(message: string): Result {
        return new Result(400, message, null);
    }

    static isOrNot(condition: boolean, message: string): Result {
        return condition ? Result.success(message + MsgConst.success) : Result.fail(message + MsgConst.fail);
    }
}