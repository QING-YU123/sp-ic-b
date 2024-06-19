import { Dto } from "src/.dtos/dto";

export class BillQueryDto extends Dto { 
    body: {
        pageSize: number;

        pageIndex: number;

        paid: boolean;
    };
}