export class StringTool { 
    static isLengthInRange(str: string, minLength: number, maxLength: number): boolean {
        return typeof str ==='string' && str.length >= minLength && str.length <= maxLength;
    }
}