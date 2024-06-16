import { Dto } from "src/.dtos/dto";

export class UserResetPasswordAdminDto extends Dto { 
    body: {
        id: number
    }
}