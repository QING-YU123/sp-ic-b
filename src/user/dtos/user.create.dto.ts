import { Dto } from "src/.dtos/dto";

export class UserCreateDto extends Dto {
    body: {
        phone: string;

        password: string;
        
        power: number;

        username: string;

        gender: string;

        headImg: string;

        name: string;

        idCard: string;

        address: string;

        CP: boolean;
    }
}