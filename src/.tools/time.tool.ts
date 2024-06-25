export class TimeTool { 
    static isExist(date: string): boolean{
        return !isNaN(new Date(date).getTime());
    }

    static convertToDate(date: string): string { 
        return new Date(new Date(date).getTime()).toLocaleString();
    }

    static getTime(): string { 
        let date = new Date(new Date().getTime());
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}