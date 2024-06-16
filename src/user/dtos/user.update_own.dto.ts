import { Dto } from "src/.dtos/dto";

export class UserUpdateOwnDto extends Dto { 
    body: {
        username: string;

        gender: string;

        introduction: string;
    }
}