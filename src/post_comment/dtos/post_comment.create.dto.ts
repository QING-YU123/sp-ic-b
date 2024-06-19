import { Dto } from "src/.dtos/dto";

export class PostCommentCreateDto extends Dto { 
    body: {
        uid: number;

        pid: number;

        comment: string;

        replyUid: number;
    }
}