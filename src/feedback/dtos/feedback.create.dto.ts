import { Dto } from "src/.dtos/dto";

export class FeedbackCreateDto extends Dto {
    body: {
        createdTime: string;

        uid: number;

        title: string;

        content: string;

        image: string;
    }
}