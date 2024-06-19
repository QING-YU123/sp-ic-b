import { Dto } from "src/.dtos/dto";

export class BillUpdateDto extends Dto { 
    body: {
        id: number,

        payPassword: string
    }
}