import { Dto } from "src/.dtos/dto";

export class UserOpMoneyDto extends Dto { 
    body: {
        money: number;
    };
}