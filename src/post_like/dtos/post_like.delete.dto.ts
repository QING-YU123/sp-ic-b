import { Dto } from "src/.dtos/dto";

export class PostLikeDeleteDto extends Dto { 
    body: {
        pid: number;
    };
}