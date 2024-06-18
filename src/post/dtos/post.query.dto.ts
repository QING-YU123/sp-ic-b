import { Dto } from "src/.dtos/dto";

export class PostQueryDto extends Dto { 
    body: {
        pageSize: number,

        pageIndex: number,

        approved: boolean
    }
}