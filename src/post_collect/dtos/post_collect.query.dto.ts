import { Dto } from "src/.dtos/dto";

export class PostCollectQueryDto extends Dto { 
    body: {
        uid: number;

        pid: number;
    };
}