import { Dto } from "src/.dtos/dto";

export class PostLikeCreateDto extends Dto { 
    body: {
        uid: number;

        pid: number;
    };
}