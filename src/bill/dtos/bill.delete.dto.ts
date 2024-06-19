import { Dto } from "src/.dtos/dto";

export class BillDeleteDto extends Dto { 
    body: {
        id: number;
    };
}