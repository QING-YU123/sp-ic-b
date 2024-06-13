export class NumberTool { 
    static isInteger(num: any): boolean { 
        const str: string = num.toString(); 
        return Math.floor(Number(str)).toString() === str; 
    }

    static isIntegerInRange(num: any, min: number, max: number): boolean { 
        return NumberTool.isInteger(num) && num >= min && num <= max; 
    }
}