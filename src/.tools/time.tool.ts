export class TimeTool { 
    static isExist(date: string): boolean{
        return !isNaN(new Date(date).getTime());
    }

    static convertToDate(date: string): string { 
        return new Date(new Date(date).getTime()).toLocaleString();
    }
}