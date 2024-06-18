import { Dto } from "src/.dtos/dto";

export class PostCollectCreateDto extends Dto { 
    body: {
        uid: number;

        pid: number;
    };
}