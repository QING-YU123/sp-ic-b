import { Dto } from "src/.dtos/dto";

export class MessageCreateDto extends Dto {
    body: {
        uid: number;

        fromUid: number;

        title: string;

        content: string;
    }
}