import { Dto } from "src/.dtos/dto";

export class FeedbackUpdateDto extends Dto {
    body: {
        id: number;

        result: string;
    }
}