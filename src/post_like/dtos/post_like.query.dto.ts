import { Dto } from "src/.dtos/dto";

export class PostLikeQueryDto extends Dto { 
    body: {
        pid: number;
    };
}