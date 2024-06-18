import { NumConst } from './../.const/num.const';

export class NumberTool { 
    static isInteger(num: any): boolean { 
        if (typeof num == "undefined") return false; 
        const str: string = num.toString(); 
        return Math.floor(Number(str)).toString() === str; 
    }

    static isIntegerInRange(num: any, min: number, max: number): boolean { 
        return NumberTool.isInteger(num) && num >= min && num <= max; 
    }

    inRange(num: number, min: number = -NumConst.longMax, max: number = NumConst.longMax): boolean { 
        return num >= min && num <= max; 
    }
}