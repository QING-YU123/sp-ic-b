import { Dto } from "src/.dtos/dto";

export class PostCommentLikeQueryDto extends Dto { 
    body: {
        pcid: number;
    };
}