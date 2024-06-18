import { Dto } from "src/.dtos/dto";

export class BillCreateDto extends Dto { 
    uid: number;

    title: string;

    content: string;

    price: number;
}