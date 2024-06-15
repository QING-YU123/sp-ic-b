import { Dto } from "src/.dtos/dto";

export class UserCreateDto extends Dto {
    body: {
        phone: string;

        password: string;
        
        power: number;

        username: string;

        gender: number;

        headImg: string;

        introduction: string;

        name: string;

        idCard: string;

        address: string;
    }
}