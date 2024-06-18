import { Dto } from "src/.dtos/dto";

export class PostDeleteDto extends Dto { 
    body: {
        id: number;
    }
}