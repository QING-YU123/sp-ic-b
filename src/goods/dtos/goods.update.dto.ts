import { Dto } from "src/.dtos/dto";

export class GoodsUpdateDto extends Dto {
    body: {
        id: number;

        sid: number;
          
        name: string;

        coverImg: string;

        introduction: string;

        type: string;

        sold: number;

        balance: number;

        price: number;
    }
}