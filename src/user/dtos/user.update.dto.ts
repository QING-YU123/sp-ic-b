import { Dto } from "src/.dtos/dto";

export class UserUpdateDto extends Dto { 
    body: {
        id: number;

        phone: string;

        power: number;

        username: string;

        gender: string;

        headImg: string;

        introduction: string;

        name: string;

        idCard: string;

        address: string;

        CP: boolean;

        banTalk: boolean;

        status: number;
    }
}