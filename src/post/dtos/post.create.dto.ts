import { Dto } from "src/.dtos/dto";

export class PostCreateDto extends Dto { 
    body: {
        uid: number,

        tag: string,

        title: string,

        coverImg: string,

        content: string,

        status: number
    }
}