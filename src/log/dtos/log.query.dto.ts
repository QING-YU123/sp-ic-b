import { Dto } from "src/.dtos/dto";
import { type } from 'os';

export class LogQueryDto extends Dto { 
    body: {
        pageSize: number,

        pageIndex: number,

        type: number,

        date: string
    }
}