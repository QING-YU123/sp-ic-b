import { Dto } from "src/.dtos/dto";

export class PostCommentLikeDeleteDto extends Dto { 
    body: {
        pcid: number;
    };
}