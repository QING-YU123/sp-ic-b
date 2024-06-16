export class Result { 
    code: number;

    message: string;
    
    data: any;

    constructor(code: number, message: string, data: any) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    static success(data: any = null): Result {
        return new Result(200, 'success', data);
    }

    static fail(message: string = 'fail'): Result {
        return new Result(400, message, null);
    }

    static isOrNot(condition: boolean, message: string): Result {
        return condition ? Result.success() : Result.fail(message);
    }
}