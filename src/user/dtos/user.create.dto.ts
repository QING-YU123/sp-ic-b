import { Dto } from "src/.dtos/dto";

export class User extends Dto {
    body: {
        createdTime: string;

        phone: string;

        password: string;

        username: string;

        sex: number;

        headImg: string;

        introduction: string;

        name: string;

        idCard: string;

        address: string;
    }
}