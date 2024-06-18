import { Dto } from "src/.dtos/dto";

export class StoreCreateDto extends Dto {
    body: {
        uid: number;

        name: string;

        coverImg: string;

        phone: string;

        introduction: string;

        address: string;

        type: number;
    }
}