import { Dto } from "src/.dtos/dto";

export class GoodsCreateDto extends Dto {
    body: {
        sid: number;

        name: string;

        coverImg: string;

        introduction: string;

        type: string;

        balance: number;

        price: number;
    }
}