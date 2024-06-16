import { Dto } from "src/.dtos/dto";

export class UserResetPasswordOwnDto extends Dto { 
    body: {
        oldPassword: string;

        newPassword: string;
    }
}