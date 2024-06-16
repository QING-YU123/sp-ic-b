import { Dto } from "src/.dtos/dto";

export class FeedbackDeleteDto extends Dto {
    body: {
        id: number;
    }
}