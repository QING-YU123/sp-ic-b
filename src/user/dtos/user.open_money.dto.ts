import { Dto } from "src/.dtos/dto";

export class UserOpenMoneyDto extends Dto { 
    body: {
        payPassword: string;
    };
}