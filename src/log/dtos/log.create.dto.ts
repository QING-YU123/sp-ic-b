import { Dto } from "src/.dtos/dto";

export class LogCreateDto extends Dto { 
    body: {
        type: number;

        content: string;
    };
}