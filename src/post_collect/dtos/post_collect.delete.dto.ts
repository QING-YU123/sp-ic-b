import { Dto } from "src/.dtos/dto";

export class PostCollectDeleteDto extends Dto { 
    body: {
        uid: number;

        pid: number;
    };
}