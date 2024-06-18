import { Dto } from "src/.dtos/dto";

export class NoticeCreateDto extends Dto {
    body: {
        uid: number;

        title: string;

        content: string;

        type: number;
    }
}