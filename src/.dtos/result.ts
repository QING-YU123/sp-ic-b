export class Result { 
    code: number;
    msg: string;
    data: any;

    constructor(code: number, msg: string, data: any) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    static success(data: any = null): Result {
        return new Result(200, 'success', data);
    }

    static fail(msg: string = 'fail'): Result {
        return new Result(400, msg, null);
    }

    static isOrNot(condition: boolean): Result {
        return condition ? Result.success() : Result.fail();
    }
}