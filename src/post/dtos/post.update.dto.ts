import { Dto } from "src/.dtos/dto";

export class PostUpdateDto extends Dto { 
    body: {
        id: number;

        approved: boolean;
    }
}