import { Dto } from "src/.dtos/dto";

export class PostCommentDeleteDto extends Dto { 
    body: {
        id: number;
    };
}