import { Dto } from "src/.dtos/dto";

export class GoodsBuyDto extends Dto { 
    body: {
        gid: number;

        num: number;
    };
}