import { Dto } from "src/.dtos/dto";

export class ActivityQueryDto extends Dto{ 
    body: {
        type: number;

        pageSize: number;

        pageIndex: number;
    };
}