import { Dto } from "src/.dtos/dto";

export class StoreUpdateDto extends Dto {
    body: {
        id: number;

        name: string;

        coverImg: string;

        phone: string;

        introduction: string;

        address: string;

        status: number;
    }
}