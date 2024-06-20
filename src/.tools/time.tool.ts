export class TimeTool { 
    static isExist(date: string): boolean{
        return !isNaN(new Date(date).getTime());
    }
}