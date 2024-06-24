import { Dto } from "src/.dtos/dto";

export class UserResetPayPasswordDto extends Dto { 
    body: {
        phone: string;

        password: string;

        payPassword: string;
    };
}