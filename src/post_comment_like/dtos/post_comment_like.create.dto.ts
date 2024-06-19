import { Dto } from "src/.dtos/dto";

export class PostCommentLikeCreateDto extends Dto { 
    body: {
        uid: number;

        pcid: number;
    };
}