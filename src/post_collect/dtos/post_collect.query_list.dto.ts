import { Dto } from "src/.dtos/dto";

export class PostCollectQueryListDto extends Dto { 
    body: {
        pageSize: number,

        pageIndex: number
    };
}