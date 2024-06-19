import { Dto } from "src/.dtos/dto";

export class PostCommentQueryDto extends Dto { 
    body: {
        pageSize: number,

        pageIndex: number,

        pid: number,
    };
}